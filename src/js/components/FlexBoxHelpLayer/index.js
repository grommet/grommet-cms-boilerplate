/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import helpText from './flexbox.md';

export default function FlexBoxHelpLayer(props: {
  onClose: Function,
  isVisible: boolean
}) {
  const { isVisible, onClose } = props;
  return (
    <Layer
      hidden={!isVisible}
      onClose={onClose}
      closer
      align="center"
    >
      <Box pad="large">
        <Markdown content={helpText} />
      </Box>
    </Layer>
  );
}

