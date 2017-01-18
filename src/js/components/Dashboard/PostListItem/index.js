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
    id: string,
    order: number
  },
  onMenuItemClick: (name: string) => void,
  totalItems: number
}) {
  const { item, onMenuItemClick, totalItems } = props;
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
            closeOnClick
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
              disabled={item.order === 0}
              onClick={() => {
                if (item.order !== 0) {
                  onMenuItemClick('MOVE_UP');
                }
              }}
            />
            <Anchor 
              icon={<DownIcon size="small" />}
              label="Move Down"
              disabled={item.order === totalItems - 1}
              onClick={() => {
                if (item.order !== totalItems) {
                  onMenuItemClick('MOVE_DOWN');
                }
              }}
            />
          </Menu>
        </Box>
      </Box>
    </ListItem>
  );
}
