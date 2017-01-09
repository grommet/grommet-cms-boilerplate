import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import { BLOCK_TYPE_MAP } from '../DashboardContentBlocks/constants';

export default class ContentBlocks extends Component {
  _renderBlocks(blocks) {
    return blocks.map((block, index) =>
      React.cloneElement(
        BLOCK_TYPE_MAP[block.blockType].element,
        {
          ...block,
          key: `block-${index}`
        }
      )
    );
  }

  render() {
    const blocks = (this.props.blocks)
      ? this._renderBlocks(this.props.blocks)
      : undefined;
      
    return (
      <Box>
        {blocks}
      </Box>
    );
  }
};
