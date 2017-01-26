/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import BrushIcon from 'grommet/components/icons/base/Brush';

export default function BlockColorSwatchWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box
        style={{ height: 60 }}
        pad="small"
        colorIndex="accent-3"
        align="center"
        justify="center"
      >
        <BrushIcon style={{ stroke: '#f5f5f5' }} />
      </Box>
    </Box>
  );
}
