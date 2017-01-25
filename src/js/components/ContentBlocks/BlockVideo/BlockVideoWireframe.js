import React from 'react';
import Box from 'grommet/components/Box';
import PlayFillIcon from 'grommet/components/icons/base/PlayFill';

export default function BlockVideoWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box full="horizontal" pad="medium" colorIndex="accent-3" align="center">
        <PlayFillIcon colorIndex="light-2" />
      </Box>
      <Box pad="small" colorIndex="light-2" />
    </Box>
  );
}
