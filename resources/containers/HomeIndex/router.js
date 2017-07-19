import Component from './index'

// 同步路由组件
export default (store) => ({
  path: '/home',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./index').default;
      cb(null, Component);
    }, 'homeindex')
  }
})