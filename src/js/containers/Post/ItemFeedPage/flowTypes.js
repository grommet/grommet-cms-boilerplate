/* @flow */
export type LOAD_DATA_INITIATION_TYPE = 'ITEMFEEDPAGE/LOAD_DATA_INITIATION';
export type LOAD_DATA_SUCCESS_TYPE = 'ITEMFEEDPAGE/LOAD_DATA_SUCCESS';
export type LOAD_DATA_FAILURE_TYPE = 'ITEMFEEDPAGE/LOAD_DATA_FAILURE';

export type ItemFeedPageState = {
  isLoading: boolean,
  error?: { message: string }
}

export type ItemFeedPageAction = {
  type: LOAD_DATA_INITIATION_TYPE | LOAD_DATA_SUCCESS_TYPE | LOAD_DATA_FAILURE_TYPE,
  error?: { message: string }
}

declare type ItemFeedPageProps = {

}

export default ItemFeedPageProps;
