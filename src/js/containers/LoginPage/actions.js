import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';
import { browserHistory } from 'react-router';

export function loginRequest() {
  return { type: ActionTypes.USER_LOGIN_REQUEST };
}

export function loginSuccess(user) {
  return {
    type: ActionTypes.USER_LOGIN_SUCCESS,
    user
  };
}

export function loginError(errorMsg) {
  return {
    type: ActionTypes.USER_LOGIN_ERROR,
    loginError: errorMsg
  };
}

export function logoutSuccess() {
  return {
    type: ActionTypes.USER_LOGOUT_SUCCESS
  };
}

export function login(user) {
  return (dispatch, getState) => {
    let { url } = getState().api;
    fetch(`${url}/user/login`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(user)
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            const text = (status === 401)
              ? `The email and password you entered don't match.`
              : statusText;
            dispatch(loginError(text));
          } else {
            dispatch(loginSuccess(statusText));

            // redirect
            browserHistory.push('/dashboard/posts');
          }
        },
        err => {
          // dispatch app error
          dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}

export function logout(user) {
  return (dispatch, getState) => {
    dispatch(loginRequest());

    let { url } = getState().api;
    fetch(`${url}/user/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            //dispatch(loginError(text));
          } else {
            dispatch(logoutSuccess(statusText));
            browserHistory.push('/dashboard');
          }
        },
        err => {
          // dispatch app error
          //dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}

export function checkStatus() {
  return (dispatch, getState) => {
    dispatch(loginRequest());

    let { url } = getState().api;
    fetch(`${url}/check`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            //dispatch(loginError(text));
          } else {
            //dispatch(logoutSuccess(statusText));
            //browserHistory.push('/dashboard');
            console.log(`you're in.`);
            dispatch(loginSuccess(statusText));
          }
        },
        err => {
          // dispatch app error
          //dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}
