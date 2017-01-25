/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import ColorTypeList from '../Shared/ColorTypeList';

export default function BlockCarouselSwatch(props: {
  color?: {
    name: string,
    hex: string
  }
}) {
  const { color } = props;
  if (!color) {
    return null;
  }
  return (
    <Box>
      <Box
        style={{ backgroundColor: color.hex }}
        size={{ height: 'xsmall', width: 'small' }}
      />
      <ColorTypeList
        color={color}
      />
    </Box>
  );
}

