//@flow
import fetch from 'isomorphic-fetch';
import * as ActionTypes from './constants';
import { browserHistory } from 'react-router';

export function assetsRequest() {
  return {
    type: ActionTypes.ASSETS_REQUEST
  };
}

export function assetsSuccess(posts: Array<Asset>) {
  return {
    type: ActionTypes.ASSETS_SUCCESS,
    posts
  };
}

export function assetsError(errorMsg: string) {
  return {
    type: ActionTypes.ASSETS_ERROR,
    error: errorMsg
  };
}

export function assetsDeleteSuccess() {
  return {
    type: ActionTypes.ASSETS_DELETE_SUCCESS
  };
}

// Delete asset.
export function deleteAsset(id: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(assetsRequest());
    let { url } = getState().api;
    fetch(`${url}/file/${id}/delete`, {
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
            dispatch(assetsError(text));
          } else {
            // Refresh posts.
            dispatch(getAssets());
            dispatch(assetsDeleteSuccess());
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

// Create Asset.
export function submitAsset(data: Object) {
  const endPoint = (!data.id)
    ? 'file/create'
    : `file/edit/${data.id}`;
  let formData = new FormData();

  for(let name in data) {
    formData.append(name, data[name]);
  }

  return (dispatch: Function, getState: Function) => {
    let { url } = getState().api;

    dispatch(assetsRequest());
    fetch(`${url}/${endPoint}`, {
      method: 'POST',
      credentials: 'include',
      body: formData,
      headers: {
        'Accept': 'application/json, */*'
      }
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
            console.log('dispatching error:', status, statusText, json);
            dispatch(assetsError(statusText));
          } else {
            dispatch(assetsSuccess(json));
            browserHistory.push('/dashboard/assets');
          }
        },
        err => {
          // dispatch app error
          console.log(err);
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

// Get Assets list. 
// This route is auth protected to avoid publicly listing a site's full list 
// of resources/assets.
export function getAssets() {
  return (dispatch: Function, getState: Function) => {
    dispatch(assetsRequest());
    let { url } = getState().api;
    return fetch(`${url}/files`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
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
            dispatch(assetsError(text));
          } else {
            dispatch(assetsSuccess(json));
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}

// Get Asset
export function getAsset(id: string) {
  return (dispatch: Function, getState: Function) => {
    dispatch(assetsRequest());
    let { url } = getState().api;
    return fetch(`${url}/file?id=${id}`, {
      method: 'GET',
      mode: 'cors',
      credentials: 'include',
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
            dispatch(assetsError(text));
          } else {
            dispatch(assetsSuccess(json));
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(assetsError('There was an error processing your request.'));
        }
      );
  };
}
