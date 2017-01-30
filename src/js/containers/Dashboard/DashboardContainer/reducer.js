import * as ActionTypes from './constants';

const initialState = {
  error: '',
  loading: false,
  leftNavAnchor: {
    title: null,
    onClick: null
  },
  pageMenu: []
};

function dashboard(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.DASHBOARD_LOAD_NAV_SUCCESS:
      return {
        ...state,
        loading: false,
        pageMenu: action.nav
      };
    case ActionTypes.DASHBOARD_SET_LEFT_NAV_ANCHOR:
      return {
        ...state,
        leftNavAnchor: {
          title: action.label,
          onClick: action.onClick
        }
      };
    case ActionTypes.DASHBOARD_REQUEST:
      return Object.assign({}, state, {
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
