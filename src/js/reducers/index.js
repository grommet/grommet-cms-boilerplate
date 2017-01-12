import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import api from 'grommet-cms/containers/Api/reducer';
import homepage from 'grommet-cms/containers/HomePage/reducer';
import login from 'grommet-cms/containers/LoginPage/reducer';
import assets from 'grommet-cms/containers/Assets/reducer';
import post from 'grommet-cms/containers/Posts/PostPage/reducer';
import postFeedPage from 'grommet-cms/containers/Posts/PostFeedPage/reducer';
import * as dashboardReducers from 'grommet-cms/containers/Dashboard/reducers';

const rootReducer = combineReducers({
  api,
  homepage,
  login,
  assets,
  post,
  postFeedPage,
  ...dashboardReducers,
  routing
});

export default rootReducer;
