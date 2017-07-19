import React, { PropTypes } from 'react'
import { Router } from 'react-router'
import { Provider } from 'react-redux'

import '../public/styles/core.scss'

class AppContainer extends React.Component {
  static propTypes = {
    history: PropTypes.object.isRequired,
    routes: PropTypes.object.isRequired,
    routerKey: PropTypes.number,
    store: PropTypes.object.isRequired
  };

  render () {
    let me = this;
    const { history, routes, routerKey, store } = me.props;
		
    return (
      <Provider store={ store }>
        <Router history={ history } children={ routes } key={ routerKey } />
      </Provider>
    );
  }
}

export default AppContainer
