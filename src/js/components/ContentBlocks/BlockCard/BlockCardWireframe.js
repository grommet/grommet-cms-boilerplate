import React from 'react';
import Box from 'grommet/components/Box';
import TextWrapIcon from 'grommet/components/icons/base/TextWrap';

export default function BlockCardWireframe() {
  return (
    <Box pad={{ between: 'small' }}>
      <Box align="center" full="horizontal" pad="large" colorIndex="accent-3">
        <TextWrapIcon style={{ stroke: '#333' }} />
      </Box>
    </Box>
  );
}
