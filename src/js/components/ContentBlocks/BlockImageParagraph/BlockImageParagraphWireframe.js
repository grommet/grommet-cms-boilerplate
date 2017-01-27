import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockImageParagraphWireframe() {
  return (
    <Box pad={{ between: 'small' }} direction="row">
      <Box full="horizontal" pad="large" colorIndex="light-2" />
      <Box full="horizontal" pad="small" colorIndex="accent-3" />
    </Box>
  );
}
