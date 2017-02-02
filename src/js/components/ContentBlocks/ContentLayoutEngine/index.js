/* @flow */
import React, { Component } from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import type { LayoutProps } from './flowTypes';
import assignedLayoutProps from './utils';

export default class ContentLayoutEngine extends Component {
  props: LayoutProps;
  render() {
    const { blocks, layout, children } = this.props;
    return (
      <Section
        {...assignedLayoutProps(layout)}
      >
        {children.map((item, i) =>
          <Box
            key={i}
            {...assignedLayoutProps(blocks[i].layout)}
          >
            {item}
          </Box>
        )}
      </Section>
    );
  }
}
