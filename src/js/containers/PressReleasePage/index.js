import React, { Component } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import { getPressRelease } from '../DashboardPressReleasePage/actions';
import ContentBlocks from '../ContentBlocks';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';

export class PressReleasePage extends Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
    this.props.dispatch(getPressRelease(undefined, this.props.params.slug));
  }

  render() {
    const { post } = this.props;
    const title = (post.title)
      ? post.title
      : 'Press Release';

    return (
       <Box className="labs" align="center">
        <Helmet title={title} />
        <Headline size="medium" margin="none" strong={true}>
          {post.title}
        </Headline>

          <ContentBlocks blocks={post.contentBlocks} />
      </Box>
    );
  }
};

function mapStateToProps(state, props) {
  const { post, error, request } = state.pressRelease;
  return {
    post,
    error,
    request
  };
}

export default connect(mapStateToProps)(PressReleasePage);
