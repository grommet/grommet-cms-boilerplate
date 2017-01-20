import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Image from 'grommet/components/Image';
import Markdown from 'grommet/components/Markdown';

export default function BlockImagePreview ({ content, image, imageDesc }) {
  return (
    <Box colorIndex="light-1" direction="row" pad={{ between: 'medium' }}>
      <Box>
        <Image src={image.path} />
        {imageDesc}
      </Box>
      <Box>
        <Markdown content={content} components={{
          'p': { 'props': { 'margin': 'none' } }
        }}/>
      </Box>
    </Box>
  );
};

BlockImagePreview.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string
};
