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
  constructor(props) {
    super(props);
    this._renderNav = this._renderNav.bind(this);
    this._onLogoutClick = this._onLogoutClick.bind(this);
  }

  _onLogoutClick() {
    this.props.dispatch(logout());
  }

  _renderNav() {
    const { leftNavAnchor } = this.props;
    const { config } = this.context;
    const leftAnchor = leftNavAnchor && leftNavAnchor.title ?
      (
        <BackAnchor 
          onClick={leftNavAnchor.onClick}
          title={leftNavAnchor.title}
        />
      )
      :
      null;
    if (this.props.loggedIn) {
      return (
        <DashboardNav
          {...config.cms}
          leftAnchor={leftAnchor}
          onLogoutClick={this._onLogoutClick}
        />
      );
    }
    return null;
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
        {this._renderNav()}
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
  }).isRequired,
  config: React.PropTypes.shape({
    cms: React.PropTypes.shape({
      title: React.PropTypes.string.isRequired,
      logo: React.PropTypes.element,
      navLinks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          label: React.PropTypes.string,
          path: React.PropTypes.string.isRequired
        })
      ).isRequired
    })
  })
};

Dashboard.propTypes = {
  dispatch: PropTypes.func.isRequired,
  leftNavAnchor: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string
  }),
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  })
};

function mapStateToProps(state, props) {
  const { loggedIn } = state.login;
  const { loading, error, leftNavAnchor } = state.dashboard;
  return {
    loggedIn,
    loading,
    error,
    leftNavAnchor
  };
};

export default connect(mapStateToProps)(Dashboard);
