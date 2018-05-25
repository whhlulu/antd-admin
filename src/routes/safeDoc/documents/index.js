import React from 'react'
import { connect } from 'dva'
import { routerRedux } from 'dva/router'
import { Table, Button } from 'antd'
import PropTypes from 'prop-types'
import queryString from 'query-string'
import { Page } from 'components'
import Filter from './Filter'
import Modal from './Modal'
import styles from './index.less'

const Documents = ({
  documents, dispatch, location, loading,
}) => {
  location.query = queryString.parse(location.search)
  const { query, pathname } = location
  const { list, pagination, curItem, modalVisible } = documents
  const handleRefresh = (newQuery) => {
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }
  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      handleRefresh({
        ...value,
        page: 1,
      })
    },
  }
  const showModal = (record) => {
    dispatch({
      type: 'documents/showModal',
      payload: { curItem: record },
    })
  }
  const listProps = {
    rowKey: 'id',
    columns: [{
      title: '序号',
      render: (text, record, index) => (
        (index + 1)
      ),
    }, {
      title: '文档名称',
      dataIndex: 'name',
    }, {
      title: '上传人',
      dataIndex: 'userName',
    }, {
      title: '上传时间',
      dataIndex: 'time',
    }, {
      title: '处理状态',
      dataIndex: 'status',
      render: (text, record) => (text === '0' ? <span key={record.id} style={{ color: 'green' }}>处理中</span> : '处理完成'),
    }, {
      title: '水印详情',
      render: record => (<Button key={record.id} size="small" onClick={showModal.bind(null, record)}>查看</Button>),
    }, {
      title: '原始图片文件',
      dataIndex: 'url1',
      render: (text, record) => (<a key={record.id} href={text} target="_blank">{record.name}</a>),
    }, {
      title: '水印处理文件',
      dataIndex: 'url2',
      render: (text, record) => (<a key={record.id} href={text} target="_blank">{record.name}</a>),
    }],
    pagination,
    dataSource: list,
    loading: loading.effects['documents/query'],
    onChange (page) {
      dispatch(routerRedux.push({
        pathname,
        search: queryString.stringify({
          ...query,
          page: page.current,
          pageSize: page.pageSize,
        }),
      }))
    },
  }
  const modalProps = {
    item: curItem,
    visible: modalVisible,
    title: 'test',
    onCancel: () => {
      dispatch({
        type: 'documents/hideModal',
      })
    },
  }
  return (<Page inner>
    <Filter {...filterProps} />
    <Table {...listProps} />
    <Modal {...modalProps} />
  </Page>)
}

Documents.propTypes = {
  documents: PropTypes.object,
  dispatch: PropTypes.func,
}

export default connect(({ documents, loading }) => ({ documents, loading }))(Documents)
