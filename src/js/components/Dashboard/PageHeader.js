import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';

export default function PageHeader ({title, controls}) {
  return (
    <Box colorIndex="light-2" full="horizontal" direction="row"
      justify="between" responsive={false}
      pad={{ vertical: 'small', horizontal: 'medium' }}>
      <Heading tag="h4" strong={true} margin="none">
        {title}
      </Heading>
      <Box direction="row" pad={{ between: 'small' }}>
        {controls}
      </Box>
    </Box>
  );
};

PageHeader.propTypes = {
  title: PropTypes.string,
  controls: PropTypes.node
};
