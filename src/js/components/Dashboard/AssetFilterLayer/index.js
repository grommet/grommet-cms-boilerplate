/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Select from 'grommet/components/Select';
import Header from 'grommet/components/Header';
import Section from 'grommet/components/Section';
import Heading from 'grommet/components/Heading';
import FilterControl from 'grommet-addons/components/FilterControl';
import type { GrommetCustomTypes$SelectValueType } from 'grommet';

export default function AssetFilterLayer(props: {
  onToggle: Function,
  isVisible: boolean,
  filter: {
    filteredTotal: number,
    unFilteredTotal: number
  },
  form: {
    onChange: Function,
    value: string,
    options: GrommetCustomTypes$SelectValueType[],
    inline: boolean,
    multiple: boolean
  }
}) {
  const { onToggle, isVisible, filter, form } = props;
  return (
    <Box>
      <FilterControl
        onClick={onToggle}
        {...filter}
      />
      <Layer
        hidden={!isVisible}
        onClose={onToggle}
        closer
        align="right"
      >
        <Header size="large" justify="between" align="center">
          <Heading tag="h2">
            Filter Assets
          </Heading>
        </Header>
        <Section pad={{ horizontal: 'large', vertical: 'small' }}>
          <Box>
            <Heading tag="h3">
              Categories
            </Heading>
            <Select
              {...form}
            />
          </Box>
        </Section>
      </Layer>
    </Box>
  );
}

