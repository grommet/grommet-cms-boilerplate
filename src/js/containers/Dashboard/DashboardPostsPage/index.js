import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { getPosts, deletePost } from 'grommet-cms/containers/Posts/PostPage/actions';
import { blockAddList } from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import List from 'grommet-cms/components/Dashboard/List';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import SpinningIcon from 'grommet/components/icons/Spinning';
import ConfirmLayer from 'grommet-cms/components/Dashboard/ConfirmLayer';
import { PageHeader, AddPostForm } from 'grommet-cms/components';
import { submitPost, setPost } from 'grommet-cms/containers/Posts/PostPage/actions';
import { toggleAddPostFormVisibility, addPostRedirect } from './actions';

export class DashboardPostsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: false,
      orderLayer: false,
      postToDelete: null
    };
    this._confirmDelete = this._confirmDelete.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onToggleAddPostForm = this._onToggleAddPostForm.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onSubmitPost = this._onSubmitPost.bind(this);
    this._onCancelPost = this._onCancelPost.bind(this);
    this._onCreatePost = this._onCreatePost.bind(this);
    this._onPostChange = this._onPostChange.bind(this);
  }

  componentWillMount() {
    // Reset content block list.
    // TODO: avoid resetting content list here. Possibly route middleware.
    this.props.dispatch(blockAddList([]));
    this.props.dispatch(getPosts());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts !== prevProps.posts && this.props.request === false)
      this.setState({orderLayer: false});
  }

  componentWillReceiveProps({ request, posts, redirect }) {
    if (!request && request !== this.props.request) {
      if (redirect) {
        this.props.dispatch(addPostRedirect());
        this._onToggleAddPostForm();
        this.props.dispatch(getPosts());
      }
    }
    if (posts) {

    }
  }

  _onSubmitPost() {
    if(!this.props.request) {
      const { newPost } = this.props;
      const post = {
        ...newPost,
        sections: [
          {
            name: newPost.title,
            id: 'Marquee',
            order: 0,
            contentBlocks: []
          }
        ]
      };
      this.props.dispatch(addPostRedirect());
      this.props.dispatch(submitPost(post));
    }
  }

  _onCancelPost() {
    this.props.dispatch(setPost());
    this._onToggleAddPostForm();
  }

  _onCreatePost() {
    const newPost = {
      _id: '',
      date: new Date()
    };
    this.props.dispatch(setPost(newPost));
  }

  _onPostChange({ target, option }) {
    const { newPost } = this.props;
    const key = target.id;
    const val = option || target.value;
    let updatedPost;
    if (newPost) {
      updatedPost = {
        ...newPost,
        [key]: newPost.key != null ? `${newPost[key]}${val}` : val
      };
    } else {
      updatedPost = {
        [key]: val
      };
    }
    this.props.dispatch(setPost(updatedPost));
  }

  _onToggleAddPostForm() {
    if (!this.props.addPostForm.isVisible && !this.props.post) {
      this._onCreatePost();
    }
    this.props.dispatch(toggleAddPostFormVisibility());
  }

  _onOrderClick() {
    this.setState({ orderLayer: true });
  }

  _onLayerClose() {
    this.setState({
      layer: false,
      orderLayer: false,
      postToDelete: null
    });
  }

  _confirmDelete(id) {
    this.setState({
      layer: true,
      postToDelete: id
    });
  }

  _onDeleteSubmit(event) {
    event.preventDefault();
    this.props.dispatch(deletePost(this.state.postToDelete));
    this.setState({
      layer: false,
      postToDelete: null
    });
  }

  _renderLoader(request) {
    return (request)
      ? <SpinningIcon />
      : <Box pad="medium">
          <Heading tag="h2">
            Click 'Add Post' to add your first post.
          </Heading>
        </Box>;
  }

  render() {
    const { posts, request, addPostForm, url, newPost } = this.props;

    const layer = (this.state.layer)
      ? <ConfirmLayer onSubmit={this._onDeleteSubmit} onClose={this._onLayerClose} />
      : null;

    const list = (Array.isArray(posts) && posts.length > 0 && !request)
      ? <List list={this.props.posts} route="post" titleKey="title"
            onDelete={this._confirmDelete} links={true} />
      : this._renderLoader(request);

    return (
      <Box direction="column">
        <AddPostForm
          isVisible={addPostForm.isVisible}
          onClose={this._onToggleAddPostForm}
          form={{
            onSubmit: this._onSubmitPost,
            post: newPost || {},
            url: url,
            onCancel: this._onCancelPost,
            onChange: this._onPostChange
          }}
        />
        {layer}
        <PageHeader
          title="Posts"
          controls={
            <Button onClick={this._onToggleAddPostForm}>
              Add Post
            </Button>
          }
        />
        <Box align="center">
          {list}
        </Box>
      </Box>
    );
  }
};

DashboardPostsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.bool,
  addPostForm: PropTypes.shape({
    isVisible: PropTypes.bool.isRequired
  }).isRequired,
  newPost: PropTypes.object,
  redirect: PropTypes.bool.isRequired
};

function mapStateToProps (state, props) {
  const { request, error, posts, post } = state.posts;
  const { addPostForm, redirect } = state.dashboardPosts;
  const { url } = state.fileUpload;
  return {
    request,
    url,
    redirect,
    error,
    posts,
    newPost: post,
    addPostForm
  };
};

export default connect(mapStateToProps)(DashboardPostsPage);
