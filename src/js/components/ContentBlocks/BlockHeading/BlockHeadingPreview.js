import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function BlockHeadingPreview ({ content }) {
  return (
    <Box>
      <Heading tag="h2" margin="none">
        {content}
      </Heading>
    </Box>
  );
};

BlockHeadingPreview.propTypes = {
  content: PropTypes.string
};
