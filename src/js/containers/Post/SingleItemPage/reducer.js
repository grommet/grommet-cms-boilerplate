/* @flow */
import * as T from './constants';
import { SingleItemPageState, SingleItemPageAction } from './flowTypes';

export const initialState: SingleItemPageState = {
  isLoading: false,
  error: null
};

const singleItemPageReducer = (
  state: SingleItemPageState = initialState,
  action: SingleItemPageAction
): SingleItemPageState => {
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

export default singleItemPageReducer;
