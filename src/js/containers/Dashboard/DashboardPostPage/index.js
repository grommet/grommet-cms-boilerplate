import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPost, submitPost } from 'grommet-cms/containers/Posts/PostPage/actions';
import PostForm from './form';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import SpinningIcon from 'grommet/components/icons/Spinning';
import { PageHeader, PostPreview, LoadingIndicator } from 'grommet-cms/components';

export class DashboardPostPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.params;
    if (id && id !== 'create')
      this.props.dispatch(getPost(id));
  }

  _onSubmit(formData) {
    if(!this.props.request)
      this.props.dispatch(submitPost(formData));
  }

  render() {
    const { post } = this.props;
    let form = (!this.props.request
      && post
      && this.props.params.id !== 'create')
      ? <PostForm post={post} onSubmit={this._onSubmit} />
    : <LoadingIndicator />;

    // New post form
    if (this.props.params.id == 'create')
      form = (<PostForm post={{}} onSubmit={this._onSubmit} />);

    const error = (this.props.error)
      ? <span>{this.props.error}</span>
      : null;

    return (
      <Box>
        <Split separator>
          <Box>
            <PageHeader
              title="Edit Marquee"
            />
            {form}
          </Box>
          <Box>
            <PageHeader
              title="Preview"
            />
            <PostPreview
              post={post}
            />
          </Box>
        </Split>
        {error}
      </Box>
    );
  }
};

DashboardPostPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  })
};

function mapStateToProps(state, props) {
  const { post, error, request } = state.posts;
  const { contentBlocks } = state;
  return {
    contentBlocks,
    post,
    error,
    request
  };
};

export default connect(mapStateToProps)(DashboardPostPage);
