import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPost, submitPost, setPost } from 'grommet-cms/containers/Posts/PostPage/actions';
import PostForm from './form';
import Box from 'grommet/components/Box';
import Split from 'grommet/components/Split';
import { PageHeader, PostPreview, LoadingIndicator } from 'grommet-cms/components';

export class DashboardPostPage extends Component {
  constructor(props) {
    super(props);

    this._onSubmit = this._onSubmit.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
  }

  componentWillMount() {
    const { id } = this.props.params;
    if (id && id !== 'create')
      this.props.dispatch(getPost(id));
  }

  _onSubmit() {
    if(!this.props.request)
      this.props.dispatch(submitPost(this.props.post));
  }

  _onCreatePost(post) {
    this.props.dispatch(setPost(post));
  }

  _onPostChange({ target, option }) {
    const { post } = this.props;
    const key = target.id;
    const val = option || target.value;
    let newPost;
    if (post) {
      newPost = {
        ...post,
        [key]: post.key != null ? `${post[key]}${val}` : val
      };
    } else {
      newPost = {
        [key]: val
      };
    }
    this.props.dispatch(setPost(newPost));
  }

  render() {
    const { post } = this.props;
    let form = (!this.props.request
      && post
      && this.props.params.id !== 'create')
      ? <PostForm
          onChange={this._onPostChange}
          post={post}
          onSubmit={this._onSubmit}
        />
      : <LoadingIndicator />;

    // New post form
    if (this.props.params.id == 'create')
      form = (
        <PostForm
          onCreatePost={this._onCreatePost}
          onChange={this._onPostChange}
          post={post || {}}
          onSubmit={this._onSubmit}
        />
      );

    const error = (this.props.error)
      ? <span>{this.props.error}</span>
      : null;

    return (
      <Box>
        <Split
          separator
          priority="left"
          showOnResponsive="priority"
        >
          <Box>
            <PageHeader title="Edit Marquee" />
            {form}
          </Box>
          <Box>
            <PageHeader title="Preview" />
            <PostPreview post={post} />
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
