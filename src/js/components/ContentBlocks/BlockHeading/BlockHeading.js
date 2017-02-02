import React, { PropTypes } from 'react';
import Headline from 'grommet/components/Headline';

export default function BlockHeading ({ content }) {
  return (
    <Headline>
      {content}
    </Headline>
  );
};

BlockHeading.propTypes = {
  content: PropTypes.string
};
