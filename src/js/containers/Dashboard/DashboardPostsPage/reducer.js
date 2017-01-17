import * as ActionTypes from './constants';

const initialState = {
  addPostForm: {
    isVisible: false
  },
  redirect: false
};

function dashboardPosts(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.DASHBOARD_POSTS_TOGGLE_FORM:
      return {
        ...state,
        addPostForm: {
          isVisible: !state.addPostForm.isVisible
        }
      };
    case ActionTypes.DASHBOARD_POSTS_ADD_POST_REDIRECT:
      return {
        ...state,
        redirect: !state.redirect
      };
    default:
      return state;
  }
}

export default dashboardPosts;
