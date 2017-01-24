import React, { Component } from 'react';
import { BLOCK_TYPE_MAP } from 'grommet-cms/containers/Dashboard/DashboardContentBlocks/constants';

export default class ContentBlocks extends Component {
  _renderBlocks(blocks) {
    return blocks.map((block, index) => {
      return (!block.edit) ? React.cloneElement(
        BLOCK_TYPE_MAP[block.blockType].element,
        {
          ...block,
          key: `block-${index}`
        }
      ) : undefined;
    });
  }

  render() {
    const blocks = (this.props.blocks)
      ? this._renderBlocks(this.props.blocks)
      : undefined;

    return (
      <div>
        {blocks}
      </div>
    );
  }
};
