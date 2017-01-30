import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Headline from 'grommet/components/Headline';
import Heading from 'grommet/components/Heading';

export class DashboardHomePage extends Component {
  render() {
    return (
      <Box direction="column" pad={{horizontal: 'medium'}}>
        <Section pad="large">
          <Headline align="center">Brand Central</Headline>
          <Heading align="center" tag="h2">Content Management</Heading>
          <Heading align="center" tag="h4">Suggestion: click one of the navigation items to get started</Heading>
        </Section>
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
