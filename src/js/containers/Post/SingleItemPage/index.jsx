/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as SingleItemPageActionCreators from './actions';
import { selectMyProp } from './selectors';
import SingleItemPageProps from './flowTypes';

class SingleItemPage extends Component { // eslint-disable-line react/prefer-stateless-function
  props: SingleItemPageProps;
  render() {
    return (
      <Box>

      </Box>
    );
  }
}


const mapStateToProps = (state) => ({
  // myProp: selectMyProp(state)
});

const mapDispatchToProps = (dispatch) => ({
  actions: bindActionCreators(
    SingleItemPageActionCreators,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SingleItemPage);
