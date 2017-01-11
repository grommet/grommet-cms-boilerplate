import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import api from '../containers/Api/reducer';
import homepage from '../containers/HomePage/reducer';
import dashboardHomepage from '../containers/DashboardHomePage/reducer';
import fileUpload from '../containers/DashboardFileUpload/reducer';
import login from '../containers/LoginPage/reducer';
import dashboard from '../containers/Dashboard/reducer';
import users from '../containers/DashboardUsersPage/reducer';
import user from '../containers/DashboardUserForm/reducer';
import contentBlocks from '../containers/DashboardContentBlocks/reducer';
import pressReleases from '../containers/DashboardPressReleasesPage/reducer';
import pressRelease from '../containers/DashboardPressReleasePage/reducer';
import assets from '../containers/Assets/reducer';

const rootReducer = combineReducers({
  api,
  homepage,
  dashboardHomepage,
  fileUpload,
  login,
  dashboard,
  users,
  user,
  routing,
  contentBlocks,
  pressReleases,
  pressRelease,
  assets
});

export default rootReducer;
