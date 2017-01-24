import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function BlockImage ({ content, image }) {
  return (
    <Box>
      <Box
        texture={image.path}
        style={{backgroundPosition: '50% 50%'}}
      />
      <Box className="labs__section" pad={{horizontal: 'large'}}>
        <Heading tag="h5" strong={true} margin="small">
          {content}
        </Heading>
      </Box>
    </Box>
  );
};

BlockImage.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string
  })
};

