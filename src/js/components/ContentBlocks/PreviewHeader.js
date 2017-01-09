import React, { PropTypes } from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import DeleteIcon from 'grommet/components/icons/base/Close';
import EditIcon from 'grommet/components/icons/base/Edit';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';

export default function PreviewHeader ({ edit, onClose, onEdit, onMove, title }) {
  return (
    <Box direction="row" responsive={false} align="center">
      <Heading tag="h3">
        {title}
      </Heading>

      <Box align="end" flex="grow">
        <Box pad={{ between: 'medium' }} direction="row"
        responsive={false}>
          {(!edit) ? <EditIcon onClick={onEdit} /> : undefined}
          <UpIcon onClick={onMove.bind(this, 'up')}/>
          <DownIcon onClick={onMove.bind(this, 'down')}/>
          <DeleteIcon onClick={onClose} />
        </Box>
      </Box>
    </Box>
  );
};

PreviewHeader.propTypes = {
  onClose: PropTypes.func,
  onEdit: PropTypes.func
};
