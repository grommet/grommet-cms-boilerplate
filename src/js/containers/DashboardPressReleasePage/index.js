import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getPressRelease, submitPressRelease } from './actions';

import PressReleaseForm from './form';
import Box from 'grommet/components/Box';
import SpinningIcon from 'grommet/components/icons/Spinning';

export class DashboardPressReleasePage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      post: {}
    };

    this._onSubmit = this._onSubmit.bind(this);
  }

  componentWillMount() {
    if(this.props.params.id !== 'create')
      this.props.dispatch(getPressRelease(this.props.params.id));
  }

  _onSubmit(formData) {
    if(!this.props.request)
      this.props.dispatch(submitPressRelease(formData));
  }

  render() {
    let form = (!this.props.request 
      && this.props.params.id !== 'create'
      && this.props.post.title !== undefined) 
      ? <PressReleaseForm post={this.props.post} onSubmit={this._onSubmit} />
      : <span><SpinningIcon /> Loading</span>;

    // New post form
    if (this.props.params.id == 'create') 
      form = (<PressReleaseForm post={{}} onSubmit={this._onSubmit} />);

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

DashboardPressReleasePage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  params: PropTypes.shape({
    id: PropTypes.string
  })
};

function mapStateToProps(state, props) {
  const { post, error, request } = state.pressRelease;
  const { url } = state.image;
  return {
    post,
    error,
    request,
    url
  };
};

export default connect(mapStateToProps)(DashboardPressReleasePage);
