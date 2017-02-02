import React, { PropTypes } from 'react';
import Headline from 'grommet/components/Headline';

export default function BlockHeadingPreview ({ content }) {
  return (
    <Headline>
      {content}
    </Headline>
  );
};

BlockHeadingPreview.propTypes = {
  content: PropTypes.string
};
