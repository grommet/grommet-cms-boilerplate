/* @flow */
import * as T from './constants';
import { ItemFeedPageAction } from './flowTypes';

export const loadDataInitiation = (): ItemFeedPageAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess = (): ItemFeedPageAction => ({
  type: T.LOAD_DATA_SUCCESS
});

export const loadDataFailure = (error: { message: string }): ItemFeedPageAction => ({
  type: T.LOAD_DATA_FAILURE,
  error
});
