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

export function loginLoadToken(token) {
  return {
    type: ActionTypes.USER_LOGIN_LOAD_TOKEN,
    token
  };
}

// Note: not meant to be secure.  The api must validate token effectively.
// This will allow bypass of login
export function persistUser() {
  return new Promise(async (res) => {
    const token = await localStorage.setItem('has_grommet_cms_account', true);
    res(token);
  });
}

export function loadPersistedUser() {
  return async function(dispatch) {
    const token = await localStorage.getItem('has_grommet_cms_account');
    const isValid = token === 'true';
    dispatch(loginLoadToken(isValid));
  };
}

export function clearToken() {
  localStorage.setItem('has_grommet_cms_account', false);
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
            persistUser().then(() => {
              dispatch(loginSuccess(statusText));
            })
            .catch(err => {
              throw new Error(err.message);
            });
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
    clearToken();

    let { url } = getState().api;
    fetch(`${url}/user/logout`, {
      method: 'GET',
      credentials: 'include'
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(loginError('There was an error processing your request.'));
          } else {
            dispatch(logoutSuccess(statusText));
            browserHistory.push('/dashboard');
          }
        },
        err => {
          // dispatch app error
          dispatch(loginError('There was an error processing your request.'));
        }
      );
  };
}
