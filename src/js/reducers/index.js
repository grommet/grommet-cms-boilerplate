import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';

import api from '../containers/Api/reducer';
import homepage from '../containers/HomePage/reducer';
import login from '../containers/LoginPage/reducer';
import assets from '../containers/Assets/reducer';
import * as dashboardReducers from '../containers/Dashboard/reducers';

const rootReducer = combineReducers({
  api,
  homepage,
  login,
  assets,
  ...dashboardReducers,
  routing
});

export default rootReducer;
