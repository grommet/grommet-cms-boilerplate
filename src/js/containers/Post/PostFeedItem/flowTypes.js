/* @flow */
export type LOAD_DATA_INITIATION_TYPE = 'POSTFEEDITEM/LOAD_DATA_INITIATION';
export type LOAD_DATA_SUCCESS_TYPE = 'POSTFEEDITEM/LOAD_DATA_SUCCESS';
export type LOAD_DATA_FAILURE_TYPE = 'POSTFEEDITEM/LOAD_DATA_FAILURE';

export type PostFeedItemState = {
  isLoading: boolean,
  loadingError?: { message: string }
}

export type PostFeedItemAction = {
  type: LOAD_DATA_INITIATION_TYPE | LOAD_DATA_SUCCESS_TYPE | LOAD_DATA_FAILURE_TYPE,
  loadingError?: { message: string }
}

export type PostFeedItemProps = {

}
