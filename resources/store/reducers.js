//生成一个假的reducer 丢给store
//之后这个reducer我们可以通过 injectReducer 方法往这个reducers里加入reducer
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

export const makeRootReducer = (asyncReducers) => {
  return combineReducers({
    routing: routerReducer,
    ...asyncReducers
  })
};

export const injectReducer = (store, { key, reducer }) => {
  if (store.asyncReducers.hasOwnProperty(key)) {
    return ;
  }

  store.asyncReducers[key] = reducer;
  store.replaceReducer(makeRootReducer(store.asyncReducers))
};

export default makeRootReducer
