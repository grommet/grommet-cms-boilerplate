import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Quote from 'grommet/components/Quote';

export default function BlockQuote({ content, source }) {
  return (
    <Quote borderColorIndex="brand" pad="large">
      <Heading tag="h2" strong>
        <span className="quote__open">“</span>
        {content}
        <span className="quote__close">”</span>
      </Heading>
      {source}
    </Quote>
  );
}

BlockQuote.propTypes = {
  content: PropTypes.string,
  source: PropTypes.string
};
