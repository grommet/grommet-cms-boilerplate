import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as ActionTypes from './constants';

export function pressReleaseRequest() {
  return {
    type: ActionTypes.PRESS_RELEASE_REQUEST
  };
}

export function pressReleaseSuccess(post) {
  return {
    type: ActionTypes.PRESS_RELEASE_SUCCESS,
    post
  };
}

export function pressReleaseError(errorMsg) {
  return {
    type: ActionTypes.PRESS_RELEASE_ERROR,
    error: errorMsg
  };
}

export function submitPressRelease(post) {
  const endPoint = (post.id === '')
    ? 'press-release/create'
    : `press-release/${post.id}`;

  return (dispatch, getState) => {
    dispatch(pressReleaseRequest());
    let { url } = getState().api;
    return fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      }),
      body: JSON.stringify(post)
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            dispatch(pressReleaseError(statusText));
          } else {
            dispatch(pressReleaseSuccess(statusText));
            browserHistory.push('/dashboard/press-releases');
          }
        },
        err => {
          // dispatch app error
          dispatch(pressReleaseError('There was an error processing your request.'));
        }
      );
  };
}

export function getPressRelease(id, title) {
  return (dispatch, getState) => {
    dispatch(pressReleaseRequest());
    let { url: apiUrl } = getState().api;
    const url = (!title)
      ? `${apiUrl}/press-release/${id}`
      : `${apiUrl}/press-release/title/${title}`;
      
    return fetch(url, {
      method: 'GET',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(response =>
        response.json().then(json => ({
          status: response.status,
          statusText: response.statusText,
          json
        })
      ))
      .then(
        ({ status, statusText, json }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(pressReleaseError(text));
          } else {
            dispatch(pressReleaseSuccess(json));
          }
        },
        err => {
          // dispatch app error
          dispatch(pressReleaseError('There was an error processing your request.'));
        }
      );
  };
}
