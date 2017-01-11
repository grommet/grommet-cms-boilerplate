import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getPressReleases, deletePressRelease } from './actions';
import { blockAddList } from '../DashboardContentBlocks/actions';
import { browserHistory } from 'react-router';

import List from '../../../components/Dashboard/List';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import Heading from 'grommet/components/Heading';
import ConfirmLayer from '../../../components/Dashboard/ConfirmLayer';
import Add from 'grommet/components/icons/base/Add';

export class DashboardPressReleasesPage extends Component {
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
    this.props.dispatch(getPressReleases());
  }

  componentDidUpdate(prevProps, prevState) {
    if (this.props.posts !== prevProps.posts && this.props.request === false)
      this.setState({orderLayer: false});
  }

  _onCreateClick() {
    browserHistory.push('/dashboard/press-release/create');
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
    this.props.dispatch(deletePressRelease(this.state.postToDelete));
    this.setState({
      layer: false,
      postToDelete: null
    });
  }

  render() {
    let layer = (this.state.layer)
      ? <ConfirmLayer onSubmit={this._onDeleteSubmit} onClose={this._onLayerClose} />
      : null;

    return (
      <Box direction="column" pad={{ horizontal: "medium"}}>
        {layer}
        <Box justify="between" direction="row" pad={{ vertical: 'small' }}>
          <Box>
            <Heading tag="h2" margin="none">Press Releases</Heading>
          </Box>
          <Button  label="press release" icon={<Add />}
            onClick={this._onCreateClick} primary={true} />
        </Box>
        <List list={this.props.posts} route="press-release" titleKey="title"
          onDelete={this._confirmDelete} links={true} />
      </Box>
    );
  }
};

DashboardPressReleasesPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.bool,
  posts: PropTypes.array
};

function mapStateToProps (state, props) {
  const { request, error, posts } = state.pressReleases;
  return {
    request,
    error,
    posts
  };
};

export default connect(mapStateToProps)(DashboardPressReleasesPage);
