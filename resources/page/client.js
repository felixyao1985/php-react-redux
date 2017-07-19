import React from 'react'
import ReactDOM from 'react-dom'
import { match, hashHistory } from 'react-router'
import createStore from '../store'
import ApiPromise from '../utils/ApiPromise';
import AppContainer from '../containers/AppContainer'
import rootRouter from '../containers/rootRouter'

// ======================================================
// Init Customer Middleware: API Promise
// ======================================================
const api = new ApiPromise();
const history = hashHistory;

// ========================================================
// Store and History Instantiation
// ========================================================
const store = createStore(api, history);
const routes = rootRouter(store);

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEBUG__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open()
  }
}

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('wrapper');

let render = (routerKey = null) => {
  match({ history, routes }, (error, redirectLocation, renderProps) => {
    if (error) {
      console.log(error);
      return
    }

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

// Enable HMR and catch runtime errors in RedBox
// This code is excluded from production bundle
if (__DEV__ && module.hot) {
	console.log('__DEV__',__DEV__);
  const renderApp = render;
  const renderError = (error) => {
    const RedBox = require('redbox-react');

    ReactDOM.render(<RedBox error={ error } />, MOUNT_NODE)
  };

  render = () => {
    try {
      renderApp(Math.random())
    } catch (error) {
      renderError(error)
    }
  };

  module.hot.accept(['../containers/rootRouter'], () => render())
}

// ========================================================
// Go!
// ========================================================
render();