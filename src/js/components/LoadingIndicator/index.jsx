import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import SpinningIcon from 'grommet/components/icons/Spinning';
import Heading from 'grommet/components/Heading';

export default function LoadingIndicator({ message }) {
  return (
    <Box
      style={{ marginTop: 20 }}
      align="center"
      justify="center"
    >
      {isLoading &&
        <Box
          align="center"
          justify="center"
        >
          <SpinningIcon />
          <Heading tag="h3" align="center">{message}</Heading>
        </Box>
      }
    </Box>
  );
}

LoadingIndicator.propTypes = {
  message: PropTypes.string.isRequired
};

LoadingIndicator.defaultProps = {
  message: 'Loading'
};
