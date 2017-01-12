/* @flow */
import * as T from './constants';
import type { PostFeedAction } from './flowTypes';

export const loadDataInitiation = (): PostFeedAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess = (): PostFeedAction => ({
  type: T.LOAD_DATA_SUCCESS
});

export const loadDataFailure = (error: { message: string }): PostFeedAction => ({
  type: T.LOAD_DATA_FAILURE,
  error
});
