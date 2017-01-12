/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Paragraph from 'grommet/components/Paragraph';
import Section from 'grommet/components/Section';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as PostFeedActionCreators from './actions';
import { selectMyProp } from './selectors';
import type { PostFeedProps } from './flowTypes';

class PostFeed extends Component { // eslint-disable-line react/prefer-stateless-function
  props: PostFeedProps;
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
    PostFeedActionCreators,
    dispatch
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PostFeed);
