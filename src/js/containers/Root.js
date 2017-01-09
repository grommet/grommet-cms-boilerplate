import React, { Component, PropTypes } from 'react';
import { Provider } from 'react-redux';
import { getRoutes } from '../routes';
import { Router, applyRouterMiddleware } from 'react-router';
import { useScroll } from 'react-router-scroll';
import ReactGA from 'react-ga';

export default class Root extends Component { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    ReactGA.initialize('UA-73635552-1', {
      debug: false
    });
  }

  _logPageView() {
    ReactGA.set({ page: window.location.pathname });
    ReactGA.pageview(window.location.pathname);
  }

  render() {
    const { store, history } = this.props;
    return (
      <Provider store={store}>
        <Router 
          history={history} 
          routes={getRoutes(store)} 
          render={applyRouterMiddleware(useScroll())}
          onUpdate={this._logPageView}
        />
      </Provider>
    );
  }
}

Root.propTypes = {
  store: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired
};
