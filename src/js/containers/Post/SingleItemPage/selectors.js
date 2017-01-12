/* @flow */
import { createSelector } from 'reselect';

export const selectSingleItemPage = () => (state) => state.SingleItemPage;

export const selectMyProp = createSelector(
  selectSingleItemPage(),
  (SingleItemPage) => SingleItemPage.myProp
);
