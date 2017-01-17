/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import ListItem from 'grommet/components/ListItem';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import UpIcon from 'grommet/components/icons/base/Up';
import DownIcon from 'grommet/components/icons/base/Down';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';

export default function PostListItem(props: {
  item: {
    name: string,
    id: string
  },
  onMenuItemClick: (name: string) => void
}) {
  const { item, onMenuItemClick } = props;
  return (
    <ListItem separator="horizontal">
      <Box 
        full="horizontal"
        pad={{ horizontal: "medium" }}
        direction="row"
        justify="between"
      >
        <Box direction="column">
          <Heading tag="h3">{item.name}</Heading>
          <Heading tag="h5">{item.id}</Heading>
        </Box>
        <Box align="end" justify="center" style={{ zIndex: 10 }}>
          <Menu
            onClick={(e) => e.stopPropagation()}
            closeOnClick={false}
            responsive={true}
            inline={false}
            dropAlign={{ right: 'right'}}
          >
            <Anchor 
              icon={<TrashIcon size="small" />}
              label="Delete"
              onClick={() => onMenuItemClick('DELETE')}
            />
            <Anchor 
              icon={<UpIcon size="small" />}
              label="Move Up"
              onClick={() => onMenuItemClick('MOVE_UP')}
            />
            <Anchor 
              icon={<DownIcon size="small" />}
              label="Move Down"
              onClick={() => onMenuItemClick('MOVE_DOWN')}
            />
          </Menu>
        </Box>
      </Box>
    </ListItem>
  );
}

PostListItem.propTypes = {

};
