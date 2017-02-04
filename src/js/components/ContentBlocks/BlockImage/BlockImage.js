import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function BlockImage ({ content, image, imageSize }) {
  const imageSizeLower = imageSize.toLowerCase();
  const full = imageSize === 'Full' ? 'horizontal' : false;
  const size = imageSize === 'Full'
    ? { height: 'xlarge' }
    : { height: imageSizeLower, width: imageSizeLower };
  return (
    <div>
      <Box
        full={full}
        size={size}
        texture={image.path}
        style={{ backgroundPosition: '50% 50%' }}
      />
      <Box className="labs__section" pad={{horizontal: 'large'}}>
        <Heading tag="h5" strong={true} margin="small">
          {content}
        </Heading>
      </Box>
    </div>
  );
};

BlockImage.propTypes = {
  content: PropTypes.string,
  image: PropTypes.shape({
    path: PropTypes.string
  })
};

