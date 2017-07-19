import { applyMiddleware, compose, createStore } from 'redux'
import { routerMiddleware } from 'react-router-redux'
import thunkMiddleware from 'redux-thunk'
import makeRootReducer from './reducers'

const isNode = typeof window === 'undefined';

export default (api, history) => {
  // ======================================================
  // Middleware Configuration
  // ======================================================
  const middleware = [
    thunkMiddleware,
    api.middleware, //?
    routerMiddleware(history)
  ];

  // ======================================================
  // Store Enhancers
  // ======================================================
  const enhancers = [];
  if (__DEBUG__) {
    const devToolsExtension = isNode ? null : window.devToolsExtension;
    if (typeof devToolsExtension === 'function') {
      enhancers.push(devToolsExtension())
    }
  }

  // ======================================================
  // Store Instantiation and HMR Setup
  // ======================================================
  const store = createStore(
    // reducers 
	//生成一个假的reducer 丢给store
	//之后这个reducer我们可以通过 injectReducer方法往这个reducers里加入reducer
    makeRootReducer(),

    // middleware
    compose(
      applyMiddleware(...middleware),
      ...enhancers
    )
  );
  store.asyncReducers = {};
  // ======================================================
  // 热模块替换
  // ======================================================
  if (module.hot) {
    module.hot.accept('./reducers', () => {
      const reducers = require('./reducers').default;
      store.replaceReducer(reducers)
    })
  }

  return store
}
