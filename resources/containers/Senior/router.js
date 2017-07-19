import { injectReducer } from '../../store/reducers'

// 异步路由组件
export default (store) => ({
  path: '/senior',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
	  //注入 Reducer
      injectReducer(store, { key: 'seniordata', reducer: require('../../store/senior').default });
      const Component = require('./index').default;
      cb(null, Component);
    }, 'senior')
  }
})