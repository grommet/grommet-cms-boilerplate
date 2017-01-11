import React, { PropTypes } from 'react';
import Anchor from 'grommet/components/Anchor';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import EditIcon from 'grommet/components/icons/base/Edit';
import DocumentIcon from 'grommet/components/icons/base/Document';
import { isImage } from '../../utils';

export default function AssetTile ({ id, path, title, onDeleteClick }) {
  const thumbnail = (isImage(path))
    ? <Box 
        texture={path} 
        size={{ 
          height: { min: 'small', max: 'small' },
          width: { min: 'medium', max: 'medium' }
        }}
        style={{
          backgroundSize: 'contain'
        }}
        colorIndex="grey-3"
      />
    : <Box 
        size={{ 
          height: { min: 'small', max: 'small' },
          width: { min: 'medium', max: 'medium' }
        }}
        style={{
          backgroundSize: 'contain'
        }}
        colorIndex="grey-3"
        align="center"
        justify="center">
        <DocumentIcon size="xlarge" />
      </Box>;

  return (
    <Box pad="small">
      <Box separator="all">
        <Box colorIndex="light-2" align="end">
          <Menu responsive={true}
            inline={false}
            dropAlign={{ right: 'right'}}>
            <Anchor onClick={onDeleteClick}>
              <TrashIcon size="small" /> Delete
            </Anchor>
            <Anchor path={`/dashboard/asset/${id}`}>
              <EditIcon size="small" /> Edit
            </Anchor>
          </Menu>
        </Box>
        {thumbnail}
        <Box pad="small" justify="center" align="center">
          <Heading tag="h3" margin="none">
            {title || 'Asset'}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
};

AssetTile.propTypes = {
  asset: PropTypes.shape({
    path: PropTypes.string,
    title: PropTypes.string
  })
};
