import { injectReducer } from '../../store/reducers';
import domainAdd from './add.js';
import domainList from './list.js';

// 异步路由组件
export default (store) => ({
  path: '/domain',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
	  //注入 Reducer
      injectReducer(store, { key: 'domaindata', reducer: require('../../store/domain').default });
      const Component = require('./index').default;
      cb(null, Component);
    }, 'domain')
  },
  indexRoute: { component: domainList },
  childRoutes: [
	{ path: 'list', component: domainList },
    { path: 'add', component: domainAdd }
  ]

})