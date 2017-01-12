/* @flow */
import * as T from './constants';
import type { PostFeedState, PostFeedAction } from './flowTypes';

export const initialState: PostFeedState = {
  isLoading: false,
  error: null
};

const postFeedReducer = (
  state: PostFeedState = initialState,
  action: PostFeedAction
): PostFeedState => {
  switch (action.type) {
    case T.LOAD_DATA_INITIATION:
      return {
        ...state,
        isLoading: true
      };
    case T.LOAD_DATA_SUCCESS:
      return {
        ...state,
        isLoading: false
      };
    case T.LOAD_DATA_FAILURE:
      return {
        ...state,
        isLoading: false,
        error: action.error
      };
    default:
      return state;
  }
};

export default postFeedReducer;
