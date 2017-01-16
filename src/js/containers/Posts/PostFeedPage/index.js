/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { bindActionCreators } from 'redux';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import { WithLoading, ErrorNotification } from 'grommet-cms/components';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import ContentBlocks from 'grommet-cms/containers/ContentBlocks';
import Columns from 'grommet/components/Columns';
import * as PostFeedPageActionCreators from './actions';
import { selectPosts, selectError, selectIsLoading } from './selectors';
import type { PostFeedPageProps } from './flowTypes';

class PostFeedPage extends React.Component {
  props: PostFeedPageProps;
  static renderPost(post, i) {
    return (
      <Box
        key={i}
        size="medium"
      >
        <ContentBlocks blocks={post.contentBlocks} />
      </Box>
    );
  }
  static renderPosts(posts) {
    if (posts && posts.length > 0) {
      return (
        <Columns
          masonry
          maxCount={3}
          justify="center"
          size="medium"
        >
          {posts.map((post, i) =>
            PostFeedPage.renderPost(post, i)
          )}
        </Columns>
      );
    }
    return null;
  }
  constructor() {
    super();
    // $FlowFixMe contravariant issue when calling bind
    this.renderError = this.renderError.bind(this);
  }
  componentDidMount() {
    this.props.actions.getPosts();
  }
  renderError() {
    const { loadingError } = this.props;
    if (loadingError) {
      return (
        <ErrorNotification
          errors={[loadingError]}
          onClose={this.props.actions.clearErrors}
        />
      );
    }
    return null;
  }
  render() {
    const {
      posts,
      isLoading,
      loadingError
    } = this.props;
    return (
      <WithLoading isLoading={isLoading}>
        <Helmet title="Post Feed" />
        <Section full="horizontal" pad={{ vertical: "medium" }}>
          <Box full="horizontal" direction="column" responsive pad={{ vertical: "medium"}}>
            {PostFeedPage.renderPosts(posts)}
          </Box>
        </Section>
        {this.renderError(loadingError)}
      </WithLoading>
    );
  }
}

function mapStateToProps(state) {
  return {
    loadingError: selectError(state),
    isLoading: selectIsLoading(state),
    posts: selectPosts(state)
  };
}

function mapDispatchToProps(dispatch: any) {
  return {
    actions: bindActionCreators(
      PostFeedPageActionCreators,
      dispatch
    )
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeedPage);
