import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';

export default function LabsQuote({quote, source}) {
  return (
    <Quote className="labs__section quote" borderColorIndex="brand" 
      pad="large">
      <Heading tag="h2" strong={true}>
        <span className="quote__open">“</span>
        {quote}
        <span className="quote__close">”</span>
      </Heading>
      {source}
    </Quote>
  );
};

LabsQuote.propTypes = {
  quote: PropTypes.string,
  source: PropTypes.string
};
