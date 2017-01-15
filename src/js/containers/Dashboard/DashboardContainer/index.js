import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { logout } from 'grommet-cms/containers/LoginPage/actions';
import Helmet from 'react-helmet';
import Box from 'grommet/components/Box';
import GrommetApp from 'grommet/components/App';
import {
  DashboardNav,
  DashboardError,
  BackAnchor
} from 'grommet-cms/components';

export class Dashboard extends Component {
  static renderNav(props, router, onLogoutClick) {
    const path = props.location.pathname.split('/');
    const hasLeftAnchor = path.indexOf('post') >= 0;
    const leftAnchor = hasLeftAnchor ?
      <BackAnchor
        label="All Posts"
        onClick={router.goBack}
      />
    :
      null;
    if (props.loggedIn) {
      return (
        <DashboardNav
          leftAnchor={leftAnchor}
          onLogoutClick={onLogoutClick}
        />
      );
    }
    return null;
  }
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

    return (
      <GrommetApp className="dashboard" centered={false}>
        <Helmet
          title="Dashboard"
          titleTemplate="Grommet CMS | %s" />
        {Dashboard.renderNav(this.props, this.context.router, this._onLogoutClick)}
        {error}
        <Box align="center" justify="center">
          {this.props.children}
        </Box>
      </GrommetApp>
    );
  }
}

Dashboard.contextTypes = {
  router: PropTypes.shape({
    push: PropTypes.func.isRequired,
    goBack: PropTypes.func.isRequired
  }).isRequired
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
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
