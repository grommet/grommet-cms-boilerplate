/* @flow */
import { createSelector } from 'reselect';

export const selectItemFeedPage = () => (state) => state.ItemFeedPage;

export const selectMyProp = createSelector(
  selectItemFeedPage(),
  (ItemFeedPage) => ItemFeedPage.myProp
);
