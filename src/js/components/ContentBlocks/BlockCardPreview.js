import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Card from 'grommet/components/Card';
import Markdown from 'grommet/components/Markdown';

export default function BlockCardPreview ({ content, image, card }) {
  const { heading, label, linkText } = card;
  return (
    <Box colorIndex="light-1" direction="row" pad={{ between: 'medium' }}>
      <Box>
        <Card 
          colorIndex="light-2"
          thumbnail={image.path}
          heading={heading}
          label={label}
          link={
            <Anchor href="#" label={linkText} primary={true} />
          }
        />
      </Box>
      <Box>
        <Markdown content={content} components={{ 
          'p': { 'props': { 'margin': 'none' } }
        }}/>
      </Box>
    </Box>
  );
};

BlockCardPreview.propTypes = {
  content: PropTypes.string,
  image: PropTypes.string
};
