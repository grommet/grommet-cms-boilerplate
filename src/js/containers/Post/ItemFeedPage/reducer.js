/* @flow */
import * as T from './constants';
import { ItemFeedPageState, ItemFeedPageAction } from './flowTypes';

export const initialState: ItemFeedPageState = {
  isLoading: false,
  error: null
};

const itemFeedPageReducer = (
  state: ItemFeedPageState = initialState,
  action: ItemFeedPageAction
): ItemFeedPageState => {
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

export default itemFeedPageReducer;
