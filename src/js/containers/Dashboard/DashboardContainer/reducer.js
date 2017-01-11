import * as ActionTypes from './constants';

const initialState = {
  error: '',
  loading: false
};

function dashboard(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.DASHBOARD_REQUEST:
      return Object.assign({}, state, {
        error: '',
        loading: true
      });
      break;
    case ActionTypes.DASHBOARD_ERROR:
      return Object.assign({}, state, {
        error: action.error,
        loading: false
      });
      break;
    default:
      return state;
  }
}

export default dashboard;
