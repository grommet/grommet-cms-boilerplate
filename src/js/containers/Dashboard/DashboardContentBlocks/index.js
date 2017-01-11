import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { blockAdd, blockAddList } from './actions';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import DashboardContentBlock from '../DashboardContentBlock';

// This is the main container for the Dashboard Content Blocks.

export class DashboardContentBlocks extends Component {
  constructor(props) {
    super(props);

    this._onCreateBlockClick = this._onCreateBlockClick.bind(this);
  }

  componentWillMount() {
    // Check if parent component passed in blocks.
    if (this.props.blocks) 
      this.props.dispatch(blockAddList(this.props.blocks));
  }

  _onCreateBlockClick() {
    this.props.dispatch(blockAdd());
  }

  render() {
    const blocks = (this.props.contentBlocks.length > 0)
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
        <Box pad="small"/>
        <Box direction="row" pad={{ between: 'small' }} full="horizontal" 
          justify="start">
          <Button label="add block" onClick={this._onCreateBlockClick} 
            primary={false} />
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
