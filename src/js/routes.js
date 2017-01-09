import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './containers/App';
import HomePage from './containers/HomePage';
import PressReleasePage from './containers/PressReleasePage';

import Dashboard from './containers/Dashboard';
import LoginPage from './containers/LoginPage';
import DashboardHomePage from './containers/DashboardHomePage';
import DashboardUserForm from './containers/DashboardUserForm';
import DashboardUsersPage from './containers/DashboardUsersPage';
import DashboardPressReleasesPage from './containers/DashboardPressReleasesPage';
import DashboardPressReleasePage from './containers/DashboardPressReleasePage';

export const getRoutes = (store) => {
  const authRequired = (nextState, replace) => {
    const state = store.getState();

    if (!state.login.loggedIn) {
      // Not authenticated, redirect to login page.
      replace({
        state: {
          nextPathname: nextState.location.pathname
        },
        pathname: '/dashboard'
      });
    }
  };

  return (
    <Router history={browserHistory}>
      <Route path='/dashboard' component={Dashboard}>
        <IndexRoute component={LoginPage} />
        <Route path="homepage" component={DashboardHomePage} onEnter={authRequired} />
        <Route path="users" component={DashboardUsersPage} onEnter={authRequired} />
        <Route path='user/create' component={DashboardUserForm} onEnter={authRequired} />
        <Route path='press-releases' component={DashboardPressReleasesPage} onEnter={authRequired} />
        <Route path='press-release/:id' component={DashboardPressReleasePage} onEnter={authRequired} />
      </Route>

      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="news/press-release/:slug" component={PressReleasePage} />
        <Route path="*" component={HomePage} />
      </Route>
    </Router>
  );
};

