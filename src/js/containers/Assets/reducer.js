//@flow
import * as ActionTypes from './constants';

type State = {
  request: boolean,
  error: string,
  posts: Array<Asset>
};

const initialState = {
  request: false,
  error: '',
  posts: []
};

function assets(state: Object = initialState, action: Object): State {
  switch(action.type) {
    case ActionTypes.ASSETS_REQUEST:
      return Object.assign({}, state, {
        request: true,
        posts: []
      });
    case ActionTypes.ASSETS_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: '',
        posts: action.posts
      });
    case ActionTypes.ASSETS_ERROR:
      return Object.assign({}, state, {
        request: false,
        error: action.error
      });
    case ActionTypes.ASSETS_DELETE_SUCCESS:
      return Object.assign({}, state, {
        request: false,
        error: ''
      });
    default:
      return state;
  }
}

export default assets;
