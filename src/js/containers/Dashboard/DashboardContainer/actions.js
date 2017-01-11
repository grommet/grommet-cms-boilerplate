import * as ActionTypes from './constants';

export function dashboardError(error) {
  return {
    type: ActionTypes.DASHBOARD_ERROR,
    error
  };
}
