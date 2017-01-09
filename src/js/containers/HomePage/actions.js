import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export function dataRequest() {
  return {
    type: ActionTypes.HOME_PAGE_REQUEST
  };
};

export function dataSuccess(data) {
  return {
    type: ActionTypes.HOME_PAGE_SUCCESS,
    data: data
  };
};

export function dataError(errorMsg) {
  return {
    type: ActionTypes.HOME_PAGE_ERROR,
    error: errorMsg
  };
};

export function getData() {
  return (dispatch, getState) => {
    dispatch(dataRequest());

    let { url } = getState().api;
    return fetch(`${url}/homepage`, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    }).then((response) => {
      return response.json().then((json) => {
        return {
          status: response.status,
          statusText: response.statusText,
          json
        };
      });
    }).then(({ status, statusText, json }) => {
      if (status >= 400) {
        const text = statusText;
        return dispatch(dataError(text));
      }

      return dispatch(dataSuccess(json));

    }, function(err) {
      dispatch(dataError('There was an error processing your request.'));
    });
  };
};
