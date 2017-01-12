import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import { LoadingIndicator } from 'grommet-cms/components';

export default function WithLoading({ isLoading, fullHeight, children }) {
  if (isLoading) {
    return children;
  } else {
    return (
      <Box>
        {isLoading &&
          <Section
            full={{ horizontal: true, vertical: fullHeight }}
            justify="center"
            align="center"
          >
            <LoadingIndicator />
          </Section>
        }
      </Box>
    );
  }
}

WithLoading.propTypes = {
  fullHeight: PropTypes.bool.isRequired
};

WithLoading.defaultProps = {
  fullHeight: false
};
