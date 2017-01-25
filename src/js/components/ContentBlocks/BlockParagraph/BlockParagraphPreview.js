import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';

export default function BlockParagraphPreview ({ content }) {
  return (
    <Box full="horizontal">
      <Markdown content={content} components={{ 
        'p': { 'props': { 'margin': 'none' } }
      }}/>
    </Box>
  );
};

BlockParagraphPreview.propTypes = {
  content: PropTypes.string
};
