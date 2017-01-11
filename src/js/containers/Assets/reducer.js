import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  posts: []
};

function assets(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.ASSETS_REQUEST:
      return {
        ...state,
        request: true,
        posts: []
      };
    case ActionTypes.ASSETS_SUCCESS:
      return {
        ...state,
        request: false,
        error: '',
        posts: action.posts
      };
    case ActionTypes.ASSETS_ERROR:
      return {
        ...state,
        request: false,
        error: action.error
      };
    case ActionTypes.ASSETS_DELETE_SUCCESS:
      return {
        ...state,
        request: false,
        error: ''
      };
    default:
      return state;
  }
}

export default assets;
