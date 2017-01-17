import * as ActionTypes from './constants';

const initialState = {
  addPostForm: {
    isVisible: false
  }
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
    default:
      return state;
  }
}

export default dashboardPosts;
