import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import BlockQuote from './BlockQuote';

export default function BlockQuotePreview ({ content, source }) {
  return (
    <Box>
      <BlockQuote content={content} source={source} />
    </Box>
  );
};

BlockQuotePreview.propTypes = {
  content: PropTypes.string
};
