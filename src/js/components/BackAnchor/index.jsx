/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import LinkPreviousIcon from 'grommet/components/icons/base/LinkPrevious';

export default function BackAnchor(props: {
  onClick: Function,
  label: string
}) {
  return (
    <Box>
      <Anchor
        label={props.label}
        icon={<LinkPreviousIcon />}
        onClick={props.onClick}
      />
    </Box>
  );
}
