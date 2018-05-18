const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
let JCAP = 'http://jcp.jd.com/api'
/* global window */
let domain = window.location.origin
let dev = domain.indexOf('admin.jcp.jd.com')

// 本地开发环境
if (dev !== -1) {
  JCAP = 'http://admin.jcp.jd.com:8000/dev' // 测试环境接口前面添加dev 以方便webpack-dev-server代理识别   admin会与现有页面路由admin冲突
}
module.exports = {
  name: 'AntD Admin',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.svg',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  doMain: domain,
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userIsLogin: `${JCAP}/admin/user/isLogin`, // 登录状态校验
    userErpLogin: `${JCAP}/admin/user/erpLogin`, // erp账号登录
    userLogin: `${APIV1}/user/login`,
    userLogout: `${APIV1}/user/logout`,
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    posts: `${APIV1}/posts`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
