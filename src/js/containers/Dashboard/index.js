import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { logout } from '../LoginPage/actions';
import Helmet from 'react-helmet';

import GrommetApp from 'grommet/components/App';
import DashboardNav from '../../components/Dashboard/Nav';
import DashboardError from '../../components/Dashboard/Error';

export class Dashboard extends Component {
  constructor(props) {
    super(props);

    this._onLogoutClick = this._onLogoutClick.bind(this);
  }

  _onLogoutClick() {
    this.props.dispatch(logout());
  }

  render() {
    let error = (this.props.error)
      ? <DashboardError message={this.props.error} />
      : null;

    let nav = (this.props.loggedIn)
      ? <DashboardNav onLogoutClick={this._onLogoutClick}/>
      : null;

    return (
      <GrommetApp className="dashboard">
        <Helmet
          title="Dashboard"
          titleTemplate="HPE Labs | %s" />
        {nav}
        {error}
        {this.props.children}
      </GrommetApp>
    );
  }
}

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { loggedIn } = state.login;
  const { loading, error } = state.dashboard;
  return {
    loggedIn,
    loading,
    error
  };
};

export default connect(mapStateToProps)(Dashboard);
