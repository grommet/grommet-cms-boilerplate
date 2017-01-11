import React, { Component, PropTypes } from 'react';

import { connect } from 'react-redux';
import { logout } from 'grommet-cms/containers/LoginPage/actions';
import Helmet from 'react-helmet';
import GrommetApp from 'grommet/components/App';
import {
  Nav as DashboardNav,
  Error as DashboardError
} from 'grommet-cms/components/Dashboard/Nav';

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
      <GrommetApp className="dashboard" centered={false}>
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
