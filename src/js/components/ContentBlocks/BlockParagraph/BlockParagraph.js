import React, { PropTypes } from 'react';
import Markdown from 'grommet/components/Markdown';

export default function BlockParagraph ({ content }) {
  return (
    <Markdown content={content} components={{ 
      'p': { 'props':  { size: 'medium', margin: 'small' } },
      'h2': { 'props':  { strong: true } }
    }}/>
  );
};

BlockParagraph.propTypes = {
  content: PropTypes.string
};
