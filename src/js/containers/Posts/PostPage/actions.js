import fetch from 'isomorphic-fetch';
import { browserHistory } from 'react-router';
import * as ActionTypes from './constants';

export function postsRequest() {
  return {
    type: ActionTypes.POSTS_REQUEST
  };
}

export function postsSuccess(posts) {
  return {
    type: ActionTypes.POSTS_SUCCESS,
    posts
  };
}

export function postSuccess(post) {
  return {
    type: ActionTypes.POST_SUCCESS,
    post
  };
}

export function postsError(errorMsg) {
  return {
    type: ActionTypes.POSTS_ERROR,
    error: errorMsg
  };
}

export function postDeleteSuccess() {
  return {
    type: ActionTypes.POSTS_DELETE_SUCCESS
  };
}

export function setPost(post) {
  return function(dispatch) {
    dispatch({
      type: ActionTypes.SET_POST,
      post
    });
  };
}

// Delete post.
export function deletePost(id) {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    let { url } = getState().api;
    fetch(`${url}/post/${id}/delete`, {
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
            dispatch(postsError(text));
          } else {
            // Refresh posts.
            dispatch(getPosts());
            dispatch(postDeleteSuccess());
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Get posts.
export function getPosts(page = 0) {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    let { url } = getState().api;
    return fetch(`${url}/posts?page=${page}`, {
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
            dispatch(postsError(text));
          } else {
            dispatch(postsSuccess(json));
          }
        },
        err => {
          // Switch this out for Dashboard error.
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Get single post.
export function getPost(id, title) {
  return (dispatch, getState) => {
    dispatch(postsRequest());
    let { url: apiUrl } = getState().api;
    const url = (!title)
      ? `${apiUrl}/post/${id}`
      : `${apiUrl}/post/title/${title}`;

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
            dispatch(postsError(text));
          } else {
            dispatch(postSuccess(json));
          }
        },
        err => {
          // dispatch app error
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}

// Create post.
export function submitPost(post) {
  const endPoint = (post._id === '')
    ? 'post/create'
    : `post/${post._id}`;

  return (dispatch, getState) => {
    dispatch(postsRequest());
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
            dispatch(postsError(statusText));
          } else {
            dispatch(postsSuccess(statusText));
            browserHistory.push('/dashboard/posts');
          }
        },
        err => {
          // dispatch app error
          dispatch(postsError('There was an error processing your request.'));
        }
      );
  };
}
