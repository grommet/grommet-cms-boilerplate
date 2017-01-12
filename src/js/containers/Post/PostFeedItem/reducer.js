/* @flow */
import * as T from './constants';
import type { PostFeedItemState, PostFeedItemAction } from './flowTypes';

export const initialState: PostFeedItemState = {
  isLoading: false,
  error: null
};

const postFeedItemReducer = (
  state: PostFeedItemState = initialState,
  action: PostFeedItemAction
): PostFeedItemState => {
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

export default postFeedItemReducer;
