const APIV1 = '/api/v1'
const APIV2 = '/api/v2'
let JCAP = 'http://jcp.jd.com/api'
let jdOrigin = 'http://jcp.jd.com'
if (process.env.NODE_ENV === 'development') {
  JCAP = 'http://admin.jcp.jd.com:8000/dev' // 测试环境接口前面添加dev 以方便webpack-dev-server代理识别   admin会与现有页面路由admin冲突
  jdOrigin = 'http://admin.jcp.jd.com:8000'
}
module.exports = {
  name: '安全中心',
  prefix: 'antdAdmin',
  footerText: 'Ant Design Admin  © 2017 zuiidea',
  logo: '/logo.png',
  iconFontCSS: '/iconfont.css',
  iconFontJS: '/iconfont.js',
  CORS: [],
  openPages: ['/login'],
  doMain: jdOrigin,
  apiPrefix: '/api/v1',
  APIV1,
  APIV2,
  api: {
    userIsLogin: `${JCAP}/admin/user/isLogin`, // 登录状态校验
    userErpLogin: `${JCAP}/admin/user/erpLogin`, // erp账号登录
    userLogin: `${APIV1}/user/login`,
    userLogout: `${JCAP}/admin/user/logout`, // 退出登录
    userInfo: `${APIV1}/userInfo`,
    users: `${APIV1}/users`,
    documentsList: `${APIV1}/documents/query`,
    user: `${APIV1}/user/:id`,
    dashboard: `${APIV1}/dashboard`,
    menus: `${APIV1}/menus`,
    weather: `${APIV1}/weather`,
    v1test: `${APIV1}/test`,
    v2test: `${APIV2}/test`,
  },
}
