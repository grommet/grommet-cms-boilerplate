import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  posts: [],
  post: {}
};

function posts(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.SET_POST:
      return {
        ...state,
        post: action.post
      };
    case ActionTypes.POSTS_REQUEST:
      return {
        ...state,
        request: true,
        posts: []
      };
    case ActionTypes.POSTS_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        posts: action.posts,
        post: action.post
      };
    case ActionTypes.POST_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        post: action.post
      };
    case ActionTypes.POSTS_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.POSTS_DELETE_SUCCESS:
      return {
        ...state,
        request: false,
        error: ''
      };
    default:
      return state;
  }
}

export default posts;
