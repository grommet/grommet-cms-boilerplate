/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockBox(props: {
  content: ?string,
  colorIndex: ?string,
}) {
  const { content, colorIndex } = props;
  return (
    <Box
      align="center"
      justify="center"
      size={{ height: 'small' }}
      colorIndex={colorIndex || 'light-1'}
    >
      {content || ''}
    </Box>
  );
}
