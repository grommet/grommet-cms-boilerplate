/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostFeedPageActionCreators from './actions';
import { selectPosts, selectError, selectIsLoading } from './selectors';
import type { PostFeedPageProps } from './flowTypes';
import { WithLoading, ErrorNotification } from 'grommet-cms/components';

class PostFeedPage extends React.Component { // eslint-disable-line react/prefer-stateless-function
  componentWillMount() {
    this.props.actions.getPosts();
  }
  props: PostFeedPageProps;
  render() {
    const {
      posts,
      isLoading,
      errorLoading,
      actions
    } = this.props;
    return (
      <WithLoading isLoading={isLoading}>
        {errorLoading &&
          <ErrorNotification
            errors={[errorLoading]}
            onClose={actions.closeError}
          />
        }
        <Box align="bar">
          {posts &&
            <Section>
              {JSON.stringify(posts, null, 2)}
            </Section>
          }
        </Box>
      </WithLoading>
    );
  }
}


const mapStateToProps = (state) => ({
  error: selectError(state),
  isLoading: selectIsLoading(state),
  posts: selectPosts(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    PostFeedPageActionCreators,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeedPage);
