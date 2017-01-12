import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import api from 'grommet-cms/containers/Api/reducer';
import homepage from 'grommet-cms/containers/HomePage/reducer';
import login from 'grommet-cms/containers/LoginPage/reducer';
import assets from 'grommet-cms/containers/Assets/reducer';
import posts from 'grommet-cms/containers/Posts/reducer';
import * as dashboardReducers from 'grommet-cms/containers/Dashboard/reducers';

const rootReducer = combineReducers({
  api,
  homepage,
  login,
  assets,
  posts,
  ...dashboardReducers,
  routing
});

export default rootReducer;
