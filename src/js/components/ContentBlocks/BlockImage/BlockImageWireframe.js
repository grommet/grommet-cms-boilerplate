import React from 'react';
import Box from 'grommet/components/Box';
import ImageIcon from 'grommet/components/icons/base/Image';

export default function BlockImageWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box align="center" full="horizontal" pad="large" colorIndex="accent-3">
        <ImageIcon style={{ stroke: '#f5f5f5' }} />
      </Box>
      <Box full="horizontal" pad="small" colorIndex="light-2" />
    </Box>
  );
}
