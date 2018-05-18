import React from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Tabs } from 'antd'
import { routerRedux } from 'dva/router'
import queryString from 'query-string'
import { Page } from 'components'

const { TabPane } = Tabs

const EnumPostStatus = {
  UNPUBLISH: 1,
  PUBLISHED: 2,
}


const Upload = ({
                 upload, dispatch, loading, location,
               }) => {
  return (<Page inner>
    aaa
  </Page>)
}

Upload.propTypes = {
  upload: PropTypes.object,
  loading: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ upload, loading }) => ({ upload, loading }))(Upload)
