import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';

export default function BlockQuote ({ content, source }) {
  return (
    <Box full="horizontal" colorIndex="light-1" align="center">
      <Box pad="small">
        <Quote borderColorIndex="brand" pad="large">
          <Heading tag="h2" strong={true}>
            <span className="quote__open">“</span>
            {content}
            <span className="quote__close">”</span>
          </Heading>
          {source}
        </Quote>
      </Box>
    </Box>
  );
};

BlockQuote.propTypes = {
  content: PropTypes.string,
  source: PropTypes.string
};
