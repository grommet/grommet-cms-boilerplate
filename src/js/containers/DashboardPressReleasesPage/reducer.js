import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  posts: []
};

function pressReleases(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.PRESS_RELEASES_REQUEST:
      return Object.assign({}, state, {
        request: true,
        posts: []
      });
      break;
    case ActionTypes.PRESS_RELEASES_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: '',
        posts: action.posts
      });
      break;
    case ActionTypes.PRESS_RELEASES_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
      break;
    case ActionTypes.PRESS_RELEASE_DELETE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: ''
      });
      break;
    default:
      return state;
  }
}

export default pressReleases;
