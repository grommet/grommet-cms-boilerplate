import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockImageWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box full="horizontal" pad="large" colorIndex="accent-3" />
      <Box full="horizontal" pad="small" colorIndex="light-2" />
    </Box>
  );
}
