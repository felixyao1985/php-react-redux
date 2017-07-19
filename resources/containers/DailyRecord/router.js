/**
 * Created by felix on 2017/7/14.
 */
// 异步路由组件
import { injectReducer } from '../../store/reducers'

export default (store) => ({
    path: '/dailyrecord',
    getComponent (nextState, cb) {
        require.ensure([], (require) => {
            injectReducer(store, { key: 'menufilter', reducer: require('../../store/menu').default });
            const Component = require('./index').default;
            cb(null, Component);
        }, 'data')
    }
})

