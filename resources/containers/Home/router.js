import { injectReducer } from '../../store/reducers'
import SeniorRouter from '../Senior/router'
import DataDetailRouter from '../DataDetail/router'
import HomeIndexRouter from '../HomeIndex/router'
import DomainRouter from '../Domain/router'

// 异步路由组件
export default (store) => ({
  path: '/',
  //indexRoute: LoginRouter(store),
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
	  //注入 Reducer
      injectReducer(store, { key: 'userinfo', reducer: require('../../store/userinfo').default });
	  injectReducer(store, { key: 'menufilter', reducer: require('../../store/menu').default });
      const Component = require('./index').default;
      cb(null, Component);
    }, 'home')
  },
  childRoutes: [
    HomeIndexRouter(store),
    SeniorRouter(store),
    DomainRouter(store),
    DataDetailRouter(store)
  ]
})