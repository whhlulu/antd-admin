import { request, config } from 'utils'

const { api } = config
const { userIsLogin, userErpLogin, userLogout, userLogin } = api

export function login (params) {
  return request({
    url: userLogin,
    method: 'post',
    data: params,
  })
}

export function isLogin () {
  return request({
    url: userIsLogin,
    method: 'get',
  })
}

// ERP登录接口
export function erpLogin (params) {
  return request({
    url: userErpLogin,
    method: 'get',
    data: params,
  })
}

export function logout () {
  return request({
    url: userLogout,
    method: 'get',
  })
}
