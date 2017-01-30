// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetApp from 'grommet/components/App';
import Helmet from 'react-helmet';

class DashboardApp extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Helmet
          title="Dashboard"
          titleTemplate="Grommet | %s" />
        <main>
          {React.cloneElement(this.props.children, this.props)}
        </main>
      </GrommetApp>
    );
  }
}

DashboardApp.contextTypes = {
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

export default DashboardApp;
