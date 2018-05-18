/* global window */
import axios from 'axios'
import qs from 'qs'
import jsonp from 'jsonp'
import lodash from 'lodash'
import pathToRegexp from 'path-to-regexp'
import { message } from 'antd'
import { YQL, JSONP } from './config'

const Axios = axios.create({
  timeout: 10000,
  responseType: 'json',
  withCredentials: true, // 是否允许带cookie这些
  headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
})
Axios.interceptors.request.use(
  (config) => {
    // 若是有做鉴权token , 就给头部带上token
    if (window.localStorage.token) {
      config.headers.Authorization = window.localStorage.token
    }
    return config
  },
  (error) => {
    message(error)
    return Promise.reject(error.data.error.message)
  }
)

const fetch = (options) => {
  let {
    method = 'get',
    data,
    fetchType,
    url,
  } = options
  const cloneData = lodash.cloneDeep(data)
  try {
    let domin = ''
    if (url.match(/[a-zA-z]+:\/\/[^/]*/)) {
      [domin] = url.match(/[a-zA-z]+:\/\/[^/]*/)
      url = url.slice(domin.length)
    }
    const match = pathToRegexp.parse(url)

    url = pathToRegexp.compile(url)(data)
    for (let item of match) {
      if (item instanceof Object && item.name in cloneData) {
        delete cloneData[item.name]
      }
    }
    url = domin + url
  } catch (e) {
    message(e.message)
  }

  if (fetchType === 'JSONP') {
    return new Promise((resolve, reject) => {
      jsonp(url, {
        param: `${qs.stringify(data)}&callback`,
        name: `jsonp_${new Date().getTime()}`,
        timeout: 4000,
      }, (error, result) => {
        if (error) {
          reject(error)
        }
        resolve({ statusText: 'OK', status: 200, data: result })
      })
    })
  } else if (fetchType === 'YQL') {
    url = `http://query.yahooapis.com/v1/public/yql?q=select * from json where url='${options.url}?${encodeURIComponent(qs.stringify(options.data))}'&format=json`
    data = null
  }
  let params = new URLSearchParams()
  for (let key in cloneData) {
    if (Object.prototype.hasOwnProperty.call(cloneData, 'key')) {
      params.append(key, cloneData[key])
    }
  }
  switch (method.toLowerCase()) {
    case 'get':
      return Axios.get(url, { params })
    case 'delete':
      return Axios.delete(url, {
        data: params,
      })
    case 'post':
      return Axios.post(url, params)
    case 'put':
      return Axios.put(url, params)
    case 'patch':
      return Axios.patch(url, params)
    default:
      return Axios(options)
  }
}

export default function request (options) {
  if (options.url && options.url.indexOf('//') > -1) {
    const origin = `${options.url.split('//')[0]}//${options.url.split('//')[1].split('/')[0]}`
    if (window.location.origin !== origin) {
      if (JSONP && JSONP.indexOf(origin) > -1) {
        options.fetchType = 'JSONP'
      } else if (YQL && YQL.indexOf(origin) > -1) {
        options.fetchType = 'YQL' // 雅虎请求天气方式
      } else {
        options.fetchType = 'CORS' // 跨域默认为 CORS方式
      }
    }
  }

  return fetch(options).then((response) => {
    const { statusText, status } = response
    let data = options.fetchType === 'YQL' ? response.data.query.results.json : response.data
    if (data instanceof Array) {
      data = {
        list: data,
      }
    }

    return {
      success: true,
      message: statusText,
      statusCode: status,
      ...data,
    }
  }).catch((error) => {
    const { response } = error
    let msg
    let statusCode
    if (response && response instanceof Object) {
      const { data, statusText } = response
      statusCode = response.status
      msg = data.message || statusText
    } else {
      statusCode = 600
      msg = error.message || 'Network Error'
    }
    return { success: false, statusCode, message: msg }
  })
}
