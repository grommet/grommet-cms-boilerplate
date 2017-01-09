import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import LabsQuote from '../LabsQuote';

export default function BlockQuote ({ content, source }) {
  return (
    <Box full="horizontal" colorIndex="light-1" align="center">
      <Box pad="small">
        <LabsQuote 
          quote={content}
          source={source}
        />
      </Box>
    </Box>
  );
};

BlockQuote.propTypes = {
  content: PropTypes.string,
  source: PropTypes.string
};
