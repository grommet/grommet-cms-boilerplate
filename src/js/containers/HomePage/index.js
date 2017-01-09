import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';

class HomePage extends Component {
  // Server checks for this to perform universal rendering.
  /*static fetchData() {
    return undefined;
  }*/

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Box align="center" colorIndex="light-1">
        <Helmet title="Home" />
        <Section size={{ width: 'xxlarge' }} align="center">
          <Heading>
            Homepage
          </Heading>
        </Section>
      </Box>
    );
  }
}

HomePage.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  return {};
};

export default connect(mapStateToProps)(HomePage);
