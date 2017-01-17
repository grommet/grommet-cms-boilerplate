/* @flow */
import React, { Component } from 'react';
import List from 'grommet/components/List';
import ListItem from 'grommet/components/ListItem';
import Menu from 'grommet/components/Menu';
import TrashIcon from 'grommet/components/icons/base/Trash';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
// $FlowFixMe
import { PageHeader } from 'grommet-cms/components';

type Props = {
  sections?: Array<{ name: string, id: string }>,
  onMenuItemClick: Function,
  onAddSection: Function
}

export default class PostSections extends Component {
  props: Props;
  render() {
    const {
      sections,
      onMenuItemClick,
      onAddSection
    } = this.props;
    return (
      <Box>
        <PageHeader
          onClick={onAddSection}
          title="Edit Page" 
          controls={<Button plain label="Add Section" />} 
        />
        <List>
          {sections ? sections.map((item, i) => 
            <ListItem key={i} separator="horizontal">
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
              <Box align="end">
                <Menu
                  responsive={true}
                  inline={false}
                  dropAlign={{ right: 'right'}}
                >
                  <Anchor onClick={() => onMenuItemClick('DELETE')}>
                    <TrashIcon size="small" /> Delete
                  </Anchor>
                  <Anchor onClick={() => onMenuItemClick('MOVE_UP')}>
                    Move Up
                  </Anchor>
                  <Anchor onClick={() => onMenuItemClick('MOVE_DOWN')}>
                    Move Up
                  </Anchor>
                </Menu>
              </Box>
            </Box>
            </ListItem>
          )
        : 
          (
            <Box>
              <Heading tag="h2">No Sections yet</Heading>
            </Box>
          )}
        </List>
      </Box>
    );
  }
}

