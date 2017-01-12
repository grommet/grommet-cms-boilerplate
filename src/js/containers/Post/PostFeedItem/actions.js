/* @flow */
import * as T from './constants';
import type { PostFeedItemAction } from './flowTypes';

export const loadDataInitiation = (): PostFeedItemAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess = (): PostFeedItemAction => ({
  type: T.LOAD_DATA_SUCCESS
});

export const loadDataFailure = (error: { message: string }): PostFeedItemAction => ({
  type: T.LOAD_DATA_FAILURE,
  error
});
