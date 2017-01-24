/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import type { LayoutProps } from './flowTypes';

class Layout extends Component {
  props: LayoutProps;
  render() {
    const { children, section, box } = this.props;
    const childNodes = Array.isArray(children) ? children : [children];
    return (
      <Section
        {...section}
      >
        {childNodes && childNodes.map((item, i) =>
          <Box
            key={i}
            {...box}
          >
            {item}
          </Box>
        )}
      </Section>
    );
  }
}

export default Layout;
