import React, { PropTypes } from 'react';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';

export default function BlockHeading ({ content }) {
  return (
    <Section className="labs__section" pad={{ horizontal: 'large', vertical: 'small' }}
      alignSelf="center">
      <Heading tag="h2" margin="none">
        {content}
      </Heading>
    </Section>
  );
};

BlockHeading.propTypes = {
  content: PropTypes.string
};
