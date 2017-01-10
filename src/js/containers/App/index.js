// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import React from 'react';
import GrommetApp from 'grommet/components/App';
import Helmet from 'react-helmet';
import Nav from '../../components/Nav';

class App extends React.Component {
  render() {
    return (
      <GrommetApp centered={false}>
        <Helmet
          title="Home"
          titleTemplate="Grommet | %s" />
        <Nav />
        {this.props.children}
      </GrommetApp>
    );
  }
}

export default App;
