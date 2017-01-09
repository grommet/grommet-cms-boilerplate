import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import LabsQuote from '../LabsQuote';

export default function BlockQuotePreview ({ content, source }) {
  return (
    <Box>
      <LabsQuote quote={content} source={source} />
    </Box>
  );
};

BlockQuotePreview.propTypes = {
  content: PropTypes.string
};
