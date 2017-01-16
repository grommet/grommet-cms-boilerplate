// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP

import React from 'react';
import GrommetApp from 'grommet/components/App';
import Helmet from 'react-helmet';
import Nav from 'grommet-cms/components/Nav';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Helmet
          title="Home"
          titleTemplate="Grommet | %s" />
        <Nav {...this.context.config.frontend} />
        {this.props.children}
      </GrommetApp>
    );
  }
}

App.contextTypes = {
  config: React.PropTypes.shape({
    frontend: React.PropTypes.shape({
      title: React.PropTypes.string,
      logo: React.element,
      contact: {
        email: React.PropTypes.string,
        phone: React.PropTypes.string
      },
      leftNavLinks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          label: React.PropTypes.string,
          path: React.PropTypes.string.isRequired
        })
      ).isRequired,
      rightNavLinks: React.PropTypes.arrayOf(
        React.PropTypes.shape({
          label: React.PropTypes.string,
          path: React.PropTypes.string.isRequired
        })
      ).isRequired
    })
  }).isRequired
};

export default App;
