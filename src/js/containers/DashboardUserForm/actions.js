import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';
import { browserHistory } from 'react-router';

export function userRequest() {
  return {
    type: ActionTypes.USER_CREATE_REQUEST
  };
}
export function userRequestSuccess(response) {
  return {
    type: ActionTypes.USER_CREATE_SUCCESS,
    response
  };
}

export function userRequestError(errorMsg) {
  return {
    type: ActionTypes.USER_CREATE_ERROR,
    error: errorMsg
  };
}

export function createUser(user) {
  return (dispatch, getState) => {
    let { url } = getState().api;

    fetch(`${url}/user/register`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          json
        })
      ))
      .then(
        ({ status, json }) => {
          if (status >= 400) {
            // Status looks bad
            dispatch(userRequestError(json.message));
          } else {
            // Status looks good
            dispatch(userRequestSuccess(json));
            browserHistory.push('/dashboard/users');
          }
        },
        err => {
          // dispatch app error
          dispatch(userRequestError(json.message));
        }
      );
  };
}
