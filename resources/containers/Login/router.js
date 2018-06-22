import { injectReducer } from '../../store/reducers'

// 同步路由组件
export default (store) => ({
  path: '/login',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
	  //注入 Reducer
      injectReducer(store, { key: 'userinfo', reducer: require('../../store/userinfo').default });
      const Component = require('./index').default;
      cb(null, Component);
    }, 'login')
  }
})