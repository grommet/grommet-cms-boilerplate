/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
// $FlowFixMe
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
      closer={
        <Anchor
          style={{ position: 'absolute', top: 10, right: 10 }}
          onClick={onClose}
          icon={<CloseIcon />}
        />
      }
      align="center"
    >
      <Box pad="large">
        <Markdown content={helpText} />
      </Box>
    </Layer>
  );
}

