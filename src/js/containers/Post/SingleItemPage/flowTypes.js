/* @flow */
export type LOAD_DATA_INITIATION_TYPE = 'SINGLEITEMPAGE/LOAD_DATA_INITIATION';
export type LOAD_DATA_SUCCESS_TYPE = 'SINGLEITEMPAGE/LOAD_DATA_SUCCESS';
export type LOAD_DATA_FAILURE_TYPE = 'SINGLEITEMPAGE/LOAD_DATA_FAILURE';

export type SingleItemPageState = {
  isLoading: boolean,
  error?: { message: string }
}

export type SingleItemPageAction = {
  type: LOAD_DATA_INITIATION_TYPE | LOAD_DATA_SUCCESS_TYPE | LOAD_DATA_FAILURE_TYPE,
  error?: { message: string }
}

declare type SingleItemPageProps = {

}

export default SingleItemPageProps;
