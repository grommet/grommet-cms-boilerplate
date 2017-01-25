/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockColorSwatchWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box
        style={{ height: 30 }}
        pad="small"
        colorIndex="accent-3"
      />
      <Box style={{ height: 10 }} colorIndex="light-2" />
      <Box style={{ height: 10 }} colorIndex="light-2" />
      <Box style={{ height: 10 }} colorIndex="light-2" />
    </Box>
  );
}
