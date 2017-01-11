import * as ActionTypes from './constants';

const initialState = {
  request: false,
  error: '',
  post: {}
};

function pressRelease(state = initialState, action) {
  switch(action.type) {
    case ActionTypes.PRESS_RELEASE_REQUEST:
      return Object.assign({}, state, {
        request: true,
        post: {}
      });
      break;
    case ActionTypes.PRESS_RELEASE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: '',
        post: action.post
      });
      break;
    case ActionTypes.PRESS_RELEASE_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
      break;
    default:
      return state;
  }
}

export default pressRelease;
