// @flow
// (C) Copyright 2014-2015 Hewlett Packard Enterprise Development LP
import React from 'react';
import GrommetApp from 'grommet/components/App';
import Helmet from 'react-helmet';

type Props = {
  children: React$Element<*>,
};

class App extends React.Component {
  props: Props;
  render() {
    return (
      <GrommetApp centered={false}>
        <Helmet
          title="Home"
          titleTemplate="Grommet | %s" />
        {this.props.children}
      </GrommetApp>
    );
  }
}

export default App;
