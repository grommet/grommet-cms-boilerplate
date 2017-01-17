import * as ActionTypes from './constants';

export function dashboardError(error) {
  return {
    type: ActionTypes.DASHBOARD_ERROR,
    error
  };
}

export function dashboardSetLeftNavAnchor({ label, onClick }) {
  return {
    type: ActionTypes.DASHBOARD_SET_LEFT_NAV_ANCHOR,
    label,
    onClick
  };
};
