/* @flow */
import React, { Component } from 'react';
import List from 'grommet/components/List';
import Heading from 'grommet/components/Heading';
import Box from 'grommet/components/Box';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';
// $FlowFixMe
import { PageHeader, PostListItem } from 'grommet-cms/components';

type Props = {
  sections?: Array<{ name: string, id: string }>,
  onMenuItemClick: Function,
  onAddSection: Function,
  onSelectSection: Function,
  disabled: boolean
}

export default class PostList extends Component {
  props: Props;
  render() {
    const {
      sections,
      onMenuItemClick,
      onAddSection,
      onSelectSection,
      disabled
    } = this.props;
    return (
      <Box>
        <PageHeader
          title="Edit Page" 
          controls={
            <Anchor
              icon={<AddIcon size="small" />}
              label="Add Section"
              onClick={onAddSection}
            />
          } 
        />
        <List
          selectable={!disabled}
          onSelect={onSelectSection}
        >
          {sections ?
            sections.map((item, i) => 
              <PostListItem 
                key={i}
                totalItems={sections.length}
                onMenuItemClick={(name) => onMenuItemClick(name, i)}
                item={item}
              />
            )
          : 
            (
              <Box align="center" pad="medium">
                <Heading tag="h2">No Sections yet</Heading>
                <Button label="Add One" onClick={onAddSection} />
              </Box>
            )
          }
        </List>
      </Box>
    );
  }
}

