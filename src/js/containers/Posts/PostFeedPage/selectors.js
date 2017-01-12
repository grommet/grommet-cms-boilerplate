import { createSelector } from 'reselect';

export const selectPostFeedPage = () => (state) => state.postFeedPage;

export const selectPosts = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => postFeedPage.posts
);

export const selectIsLoading = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => postFeedPage.isLoading
);

export const selectError = createSelector(
  selectPostFeedPage(),
  (postFeedPage) => postFeedPage.loadingError
);
