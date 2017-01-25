/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import BrushIcon from 'grommet/components/icons/base/Brush';

export default function BlockColorSwatchWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box
        style={{ height: 30 }}
        pad="small"
        colorIndex="accent-3"
      >
        <BrushIcon colorIndex="light-2" />
      </Box>
      <Box style={{ height: 10 }} colorIndex="light-2" />
      <Box style={{ height: 10 }} colorIndex="light-2" />
      <Box style={{ height: 10 }} colorIndex="light-2" />
    </Box>
  );
}
