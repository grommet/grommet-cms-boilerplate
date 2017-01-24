// @flow
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function GenericPreview(props: {
  content: string
}) {
  return (
    <Box
      colorIndex="light-1"
      direction="row"
      pad={{ between: 'medium' }}
      full="horizontal"
    >
      <Heading tag="h3">
        {props.content}
      </Heading>  
    </Box>
  );
};

GenericPreview.defaultProps = {
  content: ''
};
