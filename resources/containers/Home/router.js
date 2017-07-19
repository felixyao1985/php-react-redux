import { injectReducer } from '../../store/reducers'
import Senior from '../Senior/router'
import LoginRouter from '../Login/router'
import DailyRecordRouter from '../DailyRecord/router'

// 异步路由组件
export default (store) => ({
  path: '/',
  indexRoute: LoginRouter(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
	  //注入 Reducer
      injectReducer(store, { key: 'logininfo', reducer: require('../../store/logininfo').default });
      const Component = require('./index').default;
      cb(null, Component);
    }, 'home')
  },
  childRoutes: [
    Senior(store),
	DailyRecordRouter(store)
  ]
})