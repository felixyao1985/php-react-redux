// 异步路由组件
export default (store) => ({
  path: '/senior/:id',
  getComponent (nextState, cb) {
    require.ensure([], (require) => {
      const Component = require('./index').default;
      cb(null, Component);
    }, 'dataDetail')
  }
})