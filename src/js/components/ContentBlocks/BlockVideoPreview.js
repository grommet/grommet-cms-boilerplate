import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Paragraph from 'grommet/components/Paragraph';
import VideoCallout from '../VideoCallout';

export default function BlockImagePreview ({ content, image, label, linkUrl }) {  
  return (
    <Box colorIndex="light-1" pad={{ between: 'medium' }} align="start">
      <VideoCallout description={content} label={label} />
      <Paragraph>
        Youtube Link: {linkUrl}
      </Paragraph>
    </Box>
  );
};

BlockImagePreview.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string,
  label: PropTypes.string,
  linkUrl: PropTypes.string
};
