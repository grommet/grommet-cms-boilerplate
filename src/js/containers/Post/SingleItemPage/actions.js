/* @flow */
import * as T from './constants';
import { SingleItemPageAction } from './flowTypes';

export const loadDataInitiation = (): SingleItemPageAction => ({
  type: T.LOAD_DATA_INITIATION
});

export const loadDataSuccess = (): SingleItemPageAction => ({
  type: T.LOAD_DATA_SUCCESS
});

export const loadDataFailure = (error: { message: string }): SingleItemPageAction => ({
  type: T.LOAD_DATA_FAILURE,
  error
});
