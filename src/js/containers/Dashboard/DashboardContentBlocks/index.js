import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { blockAddList } from './actions';
import Box from 'grommet/components/Box';
import DashboardContentBlock from 'grommet-cms/containers/Dashboard/DashboardContentBlock';

// This is the main container for the Dashboard Content Blocks.

export class DashboardContentBlocks extends Component {

  componentWillMount() {
    // Check if parent component passed in blocks.
    if (this.props.blocks)
      this.props.dispatch(blockAddList(this.props.blocks));
  }

  render() {
    const blocks = (this.props.contentBlocks && this.props.contentBlocks.length > 0)
      ? this.props.contentBlocks.map(({ id }) =>
        <DashboardContentBlock id={id} key={`block-${id}`} />)
      : <Box pad="medium" colorIndex="light-2">
          No content blocks found
        </Box>;

    return (
      <Box justify="center" align="start"
        size={{width: "xxlarge"}}>
        <Box pad={{ between: 'small' }}>
          {blocks}
        </Box>
      </Box>
    );
  }
};

DashboardContentBlocks.propTypes = {
  dispatch: PropTypes.func.isRequired
};

function mapStateToProps(state, props) {
  const { contentBlocks } = state;

  return {
    contentBlocks
  };
}

export default connect(mapStateToProps)(DashboardContentBlocks);
