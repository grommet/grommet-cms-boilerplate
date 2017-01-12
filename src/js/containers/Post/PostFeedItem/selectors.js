/* @flow */
import { createSelector } from 'reselect';

export const selectPostFeedItem = () => (state) => state.PostFeedItem;

export const selectMyProp = createSelector(
  selectPostFeedItem(),
  (PostFeedItem) => PostFeedItem.myProp
);
