import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getPost, submitPost } from 'grommet-cms/containers/Posts/PostPage/actions';

import PostForm from './form';
import Box from 'grommet/components/Box';
import SpinningIcon from 'grommet/components/icons/Spinning';

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
    let form = (!this.props.request
      && this.props.post
      && this.props.params.id !== 'create')
      ? <PostForm post={this.props.post} onSubmit={this._onSubmit} />
      : <span><SpinningIcon /> Loading</span>;

    // New post form
    if (this.props.params.id == 'create')
      form = (<PostForm post={{}} onSubmit={this._onSubmit} />);

    let error = (this.props.error)
      ? <span>{this.props.error}</span>
      : null;

    return (
      <Box pad="medium">
        {form}
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
  return {
    post,
    error,
    request
  };
};

export default connect(mapStateToProps)(DashboardPostPage);
