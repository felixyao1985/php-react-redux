import React from 'react'
import ReactDOM from 'react-dom'
import { match, hashHistory } from 'react-router'
import createStore from '../store'
import ApiPromise from '../utils/ApiPromise';
import AppContainer from '../containers/AppContainer'
import rootRouter from '../containers/rootRouter'

// ======================================================
// 初始化中间件: API Promise
// ======================================================
const api = new ApiPromise();
const history = hashHistory;

// ========================================================
// Store and History Instantiation
// ========================================================
const store = createStore(api, history);
const routes = rootRouter(store);

// ========================================================
// Render 其实渲染节点
// ========================================================
const MOUNT_NODE = document.getElementById('wrapper');

let render = (routerKey = null) => {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(error);
      return
    }
	console.log('routerKey:',routerKey);
    ReactDOM.render(
      <AppContainer
        {...renderProps}
        store={ store }
        history={ history }
        routes={ routes }
        routerKey={ routerKey }
      />,
      MOUNT_NODE
    )
  });
};

render();