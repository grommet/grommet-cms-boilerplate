import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import {
  App,
  HomePage,
  DashboardContainer,
  LoginPage,
  DashboardHomePage,
  DashboardUserForm,
  DashboardUsersPage,
  DashboardPostsPage,
  DashboardPostPage,
  PostPage,
  DashboardContentBlocks,
  AssetsPage,
  AssetPage,
  PostFeedPage
} from 'grommet-cms/containers';

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
      <Route path='/dashboard' component={DashboardContainer}>
        <IndexRoute component={LoginPage} />
        <Route path="assets" component={AssetsPage} onEnter={authRequired} />
        <Route path="asset/:id" component={AssetPage} onEnter={authRequired} />
        <Route path="homepage" component={DashboardHomePage} onEnter={authRequired} />
        <Route path="users" component={DashboardUsersPage} onEnter={authRequired} />
        <Route path='user/create' component={DashboardUserForm} onEnter={authRequired} />
        <Route path='posts' component={DashboardPostsPage} onEnter={authRequired} />
        <Route path='post/:id' component={DashboardPostPage} onEnter={authRequired} />
      </Route>

      <Route path="/" component={App}>
        <IndexRoute component={HomePage} />
        <Route path="post/:slug" component={PostPage} />
        <Route path="blocks" component={DashboardContentBlocks} />
        <Route path="/posts">
          <IndexRoute component={PostFeedPage} />
          <Route path="post/:slug" component={PostPage} />
        </Route>
      </Route>
    </Router>
  );
};
