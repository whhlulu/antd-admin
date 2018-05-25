/* global window */
/* global document */
/* global location */
/* eslint no-restricted-globals: ["error", "event"] */

import { routerRedux } from 'dva/router'
import { parse } from 'qs'
import config from 'config'
import { EnumRoleType } from 'enums'
import { isLogin, erpLogin, logout } from 'services/app'
import queryString from 'query-string'

const { prefix, doMain } = config

export default {
  namespace: 'app',
  state: {
    user: {},
    permissions: {
      visit: ['1', '2', '21', '22', '23'],
    },
    menu: [
      {
        id: '1',
        icon: 'dashboard',
        name: 'Dashboard',
        route: '/dashboard',
      }, {
        id: '2',
        bpid: '1',
        name: '安全文档',
        icon: 'safety',
      }, {
        id: '21',
        bpid: '2',
        mpid: '2',
        name: '文件加密',
        icon: 'cloud-upload',
        route: '/safeDoc/encryption',
      }, {
        id: '22',
        bpid: '2',
        mpid: '2',
        name: '历史记录',
        icon: 'profile',
        route: '/safeDoc/documents',
      }, {
        id: '23',
        bpid: '2',
        mpid: '2',
        name: '风险追踪',
        icon: 'tool',
        route: '/safeDoc/riskTrack',
      },
    ],
    menuPopoverVisible: false,
    siderFold: window.localStorage.getItem(`${prefix}siderFold`) === 'true',
    darkTheme: window.localStorage.getItem(`${prefix}darkTheme`) === 'true',
    isNavbar: document.body.clientWidth < 769,
    navOpenKeys: JSON.parse(window.localStorage.getItem(`${prefix}navOpenKeys`)) || [],
    locationPathname: '',
    locationQuery: {},
  },
  subscriptions: {

    setupHistory ({ dispatch, history }) {
      history.listen((location) => {
        dispatch({
          type: 'updateState',
          payload: {
            locationPathname: location.pathname,
            locationQuery: queryString.parse(location.search),
          },
        })
      })
    },

    setup ({ dispatch }) {
      dispatch({ type: 'query' })
      let tid
      window.onresize = () => {
        clearTimeout(tid)
        tid = setTimeout(() => {
          dispatch({ type: 'changeNavbar' })
        }, 300)
      }
    },

  },
  effects: {

    * query ({
      payload,
    }, { call, put }) {
      let checkResult = yield call(isLogin, payload)
      if (checkResult.status) { // 已经登录
        yield put({
          type: 'updateState',
          payload: {
            user: checkResult.data,
          },
        })
      } else {
        let loginResult = yield call(erpLogin, { ReturnUrl: doMain })
        if (loginResult.status) {
          yield put({
            type: 'updateState',
            payload: {
              user: loginResult.data,
            },
          })
        } else {
          window.location.href = `http://ssa.jd.com/sso/login?ReturnUrl=${doMain}` // 跳转erp
        }
      }
    },

    * logout ({
      payload,
    }, { call }) {
      const data = yield call(logout, payload)
      if (data.success) {
        window.location.href = `http://ssa.jd.com/sso/login?ReturnUrl=${doMain}` // 跳转erp
      } else {
        throw (data)
      }
    },

    * changeNavbar (action, { put, select }) {
      const { app } = yield (select(_ => _))
      const isNavbar = document.body.clientWidth < 769
      if (isNavbar !== app.isNavbar) {
        yield put({ type: 'handleNavbar', payload: isNavbar })
      }
    },

  },
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    switchSider (state) {
      window.localStorage.setItem(`${prefix}siderFold`, !state.siderFold)
      return {
        ...state,
        siderFold: !state.siderFold,
      }
    },

    switchTheme (state) {
      window.localStorage.setItem(`${prefix}darkTheme`, !state.darkTheme)
      return {
        ...state,
        darkTheme: !state.darkTheme,
      }
    },

    switchMenuPopver (state) {
      return {
        ...state,
        menuPopoverVisible: !state.menuPopoverVisible,
      }
    },

    handleNavbar (state, { payload }) {
      return {
        ...state,
        isNavbar: payload,
      }
    },

    handleNavOpenKeys (state, { payload: navOpenKeys }) {
      return {
        ...state,
        ...navOpenKeys,
      }
    },
  },
}
