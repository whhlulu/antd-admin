import React from 'react'
import PropTypes from 'prop-types'
import { Switch, Route, Redirect, routerRedux } from 'dva/router'
import dynamic from 'dva/dynamic'
import App from 'routes/app'
import { LocaleProvider } from 'antd'
import enUS from 'antd/lib/locale-provider/en_US'
import zhCN from 'antd/lib/locale-provider/zh_CN'

const { ConnectedRouter } = routerRedux

const Routers = function ({ history, app }) {
  const error = dynamic({
    app,
    component: () => import('./routes/error'),
  })
  const routes = [
    {
      path: '/login',
      models: () => [import('./models/login')],
      component: () => import('./routes/login/'),
    }, {
      path: '/dashboard',
      models: () => [import('./models/dashboard')],
      component: () => import('./routes/dashboard/'),
    }, {
      path: '/safeDoc/encryption',
      models: () => [import('./models/safeDoc/encryption')],
      component: () => import('./routes/safeDoc/encryption'),
    }, {
      path: '/safeDoc/documents',
      models: () => [import('./models/safeDoc/documents')],
      component: () => import('./routes/safeDoc/documents'),
    }, {
      path: '/safeDoc/riskTrack',
      component: () => import('./routes/safeDoc/riskTrack'),
    },
  ]

  return (
    <ConnectedRouter history={history}>
      <LocaleProvider locale={zhCN}>
        <App>
          <Switch>
            <Route exact path="/" render={() => (<Redirect to="/safeDoc/documents" />)} />
            {
            routes.map(({ path, ...dynamics }, key) => (
              <Route key={key}
                exact
                path={path}
                component={dynamic({
                  app,
                  ...dynamics,
                })}
              />
            ))
          }
            <Route component={error} />
          </Switch>
        </App>
      </LocaleProvider>
    </ConnectedRouter>
  )
}

Routers.propTypes = {
  history: PropTypes.object,
  app: PropTypes.object,
}

export default Routers
