import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getPost } from 'grommet-cms/containers/Posts/actions';
import ContentBlocks from 'grommet-cms/containers/ContentBlocks';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';

export class PostPage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getPost(undefined, this.props.params.slug));
  }

  render() {
    const { post } = this.props;
    const title = (post && post.title)
      ? post.title
      : 'Post';
    const blocks = (post && post.contentBlocks)
      ? post.contentBlocks
      : undefined;
    const image = (post && post.image)
      ? post.image
      : undefined;

    return (
       <Box className="labs" align="center">
        <Helmet title={title} />
        <Box texture={image} full="horizontal" size={{ height: 'medium' }} 
          colorIndex="grey-1" justify="center" align="center">
          <Headline size="medium" margin="none" strong={true}>
            {title}
          </Headline>
        </Box>

        <ContentBlocks blocks={blocks} />
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { post, error, request } = state.posts;
  return {
    post,
    error,
    request
  };
}

export default connect(mapStateToProps)(PostPage);
