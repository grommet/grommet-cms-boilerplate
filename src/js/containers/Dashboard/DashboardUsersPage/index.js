import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { getUsers, deleteUser } from './actions';
import { browserHistory } from 'react-router';

import DashboardList from '../../../components/Dashboard/List';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import ConfirmLayer from '../../../components/Dashboard/ConfirmLayer';
import Add from 'grommet/components/icons/base/Add';

export class DashboardUsersPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      layer: false,
      userToDelete: null
    };

    this._onCreateClick = this._onCreateClick.bind(this);
    this._confirmDelete = this._confirmDelete.bind(this);
    this._onLayerClose = this._onLayerClose.bind(this);
    this._onDeleteSubmit = this._onDeleteSubmit.bind(this);
  }

  componentWillMount() {
    this.props.dispatch(getUsers());
  }

  _onCreateClick() {
    browserHistory.push('/dashboard/user/create');
  }

  _onLayerClose() {
    this.setState({
      layer: false,
      userToDelete: null
    });
  }

  _confirmDelete(id) {
    this.setState({
      layer: true,
      userToDelete: id
    });
  }

  _onDeleteSubmit(event) {
    event.preventDefault();
    this.props.dispatch(deleteUser(this.state.userToDelete));
    this.setState({
      layer: false,
      userToDelete: null
    });
  }

  render() {
    let layer = (this.state.layer)
      ? <ConfirmLayer onSubmit={this._onDeleteSubmit} onClose={this._onLayerClose} />
      : null;

    let deleteMethod = (this.props.users.length > 1)
      ? this._confirmDelete
      : null;

    return (
      <Box direction="column" pad="medium">
        {layer}
        <Box align="end">
          <Button label="user" icon={<Add />} onClick={this._onCreateClick} primary={true} />
        </Box>
        <DashboardList list={this.props.users} titleKey="username"
          onDelete={deleteMethod} links={false} />
      </Box>
    );
  }
};

DashboardUsersPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
  request: PropTypes.bool,
  users: PropTypes.array
};

function mapStateToProps(state, props) {
  const { request, error, users } = state.users;
  return {
    request,
    error,
    users
  };
};

export default connect(mapStateToProps)(DashboardUsersPage);
