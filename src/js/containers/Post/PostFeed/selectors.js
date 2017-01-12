/* @flow */
import { createSelector } from 'reselect';

export const selectPostFeed = () => (state) => state.PostFeed;

export const selectMyProp = createSelector(
  selectPostFeed(),
  (PostFeed) => PostFeed.myProp
);
