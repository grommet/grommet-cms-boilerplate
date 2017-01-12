/* @flow */
export type LOAD_DATA_INITIATION_TYPE = 'POSTFEEDPAGE/LOAD_DATA_INITIATION';
export type LOAD_DATA_SUCCESS_TYPE = 'POSTFEEDPAGE/LOAD_DATA_SUCCESS';
export type LOAD_DATA_FAILURE_TYPE = 'POSTFEEDPAGE/LOAD_DATA_FAILURE';

export type PostFeedPageState = {
  isLoading: boolean,
  posts: ?Array<PostType>,
  loadingError: ?{ message: string }
}

export type PostFeedPageAction = {
  type: LOAD_DATA_INITIATION_TYPE | LOAD_DATA_SUCCESS_TYPE | LOAD_DATA_FAILURE_TYPE,
  error?: ?{ message: string },
  posts?: ?Array<PostType>
}

export type PostFeedPageProps = {
  actions: any,
  loadingError?: ?{ message: string },
  isLoading: boolean,
  posts?: ?Array<PostType>
}

export type PostType = any;
