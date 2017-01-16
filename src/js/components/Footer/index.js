/* @flow */
import React from 'react';
import FooterComponent from 'grommet/components/Footer';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Anchor from 'grommet/components/Anchor';

export default function Footer(props: {
  logo: HTMLElement | React$Element<any>,
  title: string,
  contact: {
    email: string
  }
}) {
  const { logo, title, contact } = props;
  return (
    <FooterComponent primary colorIndex="brand">
      <Box direction="row" pad="large">
        {logo}
        <Heading align="center">{title}</Heading>
        <Anchor align="center" href={`mailto:${contact.email}`}>{contact.email}</Anchor>
      </Box>
    </FooterComponent>
  );
}
