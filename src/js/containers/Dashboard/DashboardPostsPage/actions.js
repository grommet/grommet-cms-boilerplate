import * as ActionTypes from './constants';

export const toggleAddPostFormVisibility = () => ({
  type: ActionTypes.DASHBOARD_POSTS_TOGGLE_FORM
});

export const addPostRedirect = () => ({
  type: ActionTypes.DASHBOARD_POSTS_ADD_POST_REDIRECT
});

export const incrementCurrentPage = () => ({
  type: ActionTypes.DASHBOARD_POSTS_INCREMENT_CURRENT_PAGE
});
