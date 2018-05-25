const { config } = require('./common')

const { apiPrefix } = config

module.exports = {

  [`GET ${apiPrefix}/documents/query`] (req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1

    let filesList = [
      { id: '1', name: '文档', userName: '张三', time: '2018-12-11', status: '0', url1: 'http://www.baidu.com', url2: 'aaa' },
      { id: '2', name: 'asd', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '3', name: '按时', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '4', name: '阿双方', userName: '张三', time: '2018-12-11', status: '0', url1: 'aaa', url2: 'aaa' },
      { id: '5', name: '阿女吧', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '6', name: '尸鬼封尽高房价和法国动画搜嘎', userName: '张三', time: '2018-12-11', status: '0', url1: 'aaa', url2: 'aaa' },
      { id: '7', name: '啊啊啊啊啊', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '8', name: '123', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '9', name: '阿萨德', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '10', name: '122', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '11', name: '很少', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
      { id: '12', name: '奥术大师多撒', userName: '张三', time: '2018-12-11', status: '1', url1: 'aaa', url2: 'aaa' },
    ]

    res.status(200).json({
      data: filesList.slice((page - 1) * pageSize, page * pageSize),
      total: filesList.length,
    })
  },
}
