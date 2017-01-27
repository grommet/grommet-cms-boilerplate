import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockCarouselWireframe() {
  return (
    <Box pad={{ between: 'small' }} direction="row">
      <Box basis="1/4" colorIndex="accent-3"
        pad={{ horizontal: 'small', vertical: 'large' }} />
      <Box basis="1/2" colorIndex="accent-3"
        pad={{ horizontal: 'small', vertical: 'large' }} />
      <Box basis="1/4" colorIndex="accent-3"
        pad={{ horizontal: 'small', vertical: 'large' }} />
    </Box>
  );
}
