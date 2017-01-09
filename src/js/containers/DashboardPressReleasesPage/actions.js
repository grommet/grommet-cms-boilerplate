import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';

export function pressReleasesRequest() {
  return {
    type: ActionTypes.PRESS_RELEASES_REQUEST
  };
}

export function pressReleasesSuccess(posts) {
  return {
    type: ActionTypes.PRESS_RELEASES_SUCCESS,
    posts
  };
}

export function pressReleasesError(errorMsg) {
  return {
    type: ActionTypes.PRESS_RELEASES_ERROR,
    error: errorMsg
  };
}

export function pressReleaseDeleteSuccess() {
  return {
    type: ActionTypes.PRESS_RELEASE_DELETE_SUCCESS
  };
}

export function deletePressRelease(id) {
  return (dispatch, getState) => {
    dispatch(pressReleasesRequest());
    let { url } = getState().api;
    fetch(`${url}/press-release/${id}/delete`, {
      method: 'POST',
      credentials: 'include',
      headers: new Headers({
        'Content-Type': 'application/json'
      })
    })
      .then(
        ({ status, statusText }) => {
          if (status >= 400) {
            const text = statusText;
            dispatch(pressReleasesError(text));
          } else {
            // Refresh posts.
            dispatch(getPressReleases());
            dispatch(pressReleaseDeleteSuccess());
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(pressReleasesError('There was an error processing your request.'));
        }
      );
  };
}

export function getPressReleases(page = 0) {
  return (dispatch, getState) => {
    dispatch(pressReleasesRequest());
    let { url } = getState().api;
    return fetch(`${url}/press-releases?page=${page}`, {
      method: 'GET',
      mode: 'cors',
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
            dispatch(pressReleasesError(text));
          } else {
            dispatch(pressReleasesSuccess(json));
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(pressReleasesError('There was an error processing your request.'));
        }
      );
  };
}
