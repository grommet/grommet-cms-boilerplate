import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getPosts, deletePost } from 'grommet-cms/containers/Posts/actions';
import { blockAddList } from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/actions';
import { browserHistory } from 'react-router';

import List from 'grommet-cms/components/Dashboard/List';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import SpinningIcon from 'grommet/components/icons/Spinning';
import ConfirmLayer from 'grommet-cms/components/Dashboard/ConfirmLayer';
import { PageHeader } from 'grommet-cms/components/Dashboard';

export class DashboardPostsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: false,
      orderLayer: false,
      postToDelete: null
    };

    this._onCreateClick = this._onCreateClick.bind(this);
    this._confirmDelete = this._confirmDelete.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
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

  _onCreateClick() {
    browserHistory.push('/dashboard/posts/create');
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
    const { posts, request } = this.props;

    const layer = (this.state.layer)
      ? <ConfirmLayer onSubmit={this._onDeleteSubmit} onClose={this._onLayerClose} />
      : null;

    const list = (Array.isArray(posts) && posts.length > 0 && !request)
      ? <List list={this.props.posts} route="post" titleKey="title"
            onDelete={this._confirmDelete} links={true} />
      : this._renderLoader(request);

    return (
      <Box direction="column">
        {layer}
        <PageHeader 
          title="Posts" 
          controls={
            <Button path="/dashboard/post/create">
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
  request: PropTypes.bool
};

function mapStateToProps (state, props) {
  const { request, error, posts } = state.posts;
  return {
    request,
    error,
    posts
  };
};

export default connect(mapStateToProps)(DashboardPostsPage);
