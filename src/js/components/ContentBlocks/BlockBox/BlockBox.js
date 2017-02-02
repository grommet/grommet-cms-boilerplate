/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';

export default function BlockBox(props: {
  content: string,
  colorIndex: string,
}) {
  return (
    <Box
      align="center"
      justify="center"
      size={{ height: 'small' }}
      colorIndex={props.colorIndex}
    >
      {props.content}
    </Box>
  );
}
