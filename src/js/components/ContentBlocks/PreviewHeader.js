import React, { PropTypes } from 'react';

import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';

export default function PreviewHeader ({ edit, onClose, onEdit, onMove, title, onLayoutClick }) {
  return (
    <Box direction="row" responsive={false} align="center">
      <Heading tag="h3">
        {title}
      </Heading>

      <Box align="end" flex="grow">
        <Menu responsive={true}
          inline={false}>
          <Anchor label="Advanced Layout" onClick={onLayoutClick} />
          <Anchor onClick={onMove.bind(this, 'up')}>
            Move Up
          </Anchor>
          <Anchor onClick={onMove.bind(this, 'down')}>
            Move Down
          </Anchor>
          {(!edit) ? <Anchor onClick={onEdit}>Edit</Anchor> : undefined}
          <Anchor onClick={onClose}>
            Delete
          </Anchor>
        </Menu>
      </Box>
    </Box>
  );
};

PreviewHeader.propTypes = {
  onClose: PropTypes.func,
  onEdit: PropTypes.func,
  onLayoutClick: PropTypes.func
};
