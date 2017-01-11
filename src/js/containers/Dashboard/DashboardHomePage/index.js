import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export class DashboardHomePage extends Component {
  render() {
    return (
      <Box direction="column" pad={{horizontal: 'medium'}}>
        <Heading>Grommet CMS</Heading>
      </Box>
    );
  }
};

DashboardHomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {
  };
};

export default connect(mapStateToProps)(DashboardHomePage);
