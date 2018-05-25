import { routerRedux } from 'dva/router'

export default {
  namespace: 'encryption',
  state: {
    curStep: 0,
    saveLoading: false,
    erpPsnList: [
      { id: '1', key: 'zhangsan', name: '张三' },
      { id: '2', key: 'lisi', name: '李四' },
      { id: '3', key: 'wangwu', name: '王五' },
      { id: '4', key: 'benben', name: '笨笨' },
    ],
  },

  effects: {},
  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },
  },
}
