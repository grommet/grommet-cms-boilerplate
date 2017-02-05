/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
import AddIcon from 'grommet/components/icons/base/Add';
import Anchor from 'grommet/components/Anchor';
import { DashboardContentBlocks } from 'grommet-cms/containers';
import { PageHeader } from 'grommet-cms/components';

export default function PostListItemDetail(props: {
  item: {
    order: number,
    id: string,
    name: string,
    contentBlocks: Array<{}>
  },
  onSubmit: Function,
  onCreateBlockClick: Function,
  onCancel: Function,
}) {
  const { item, onSubmit, onCreateBlockClick, onCancel } = props;
  return (
    <Box full="horizontal">
      <PageHeader
        title={`Edit ${item.name}`}
        controls={
          <Anchor
            icon={<AddIcon size="small" />}
            label="Add Block"
            onClick={onCreateBlockClick}
          />
        }
      />
      <Section>
        <DashboardContentBlocks blocks={item.contentBlocks} />
        <Footer align="center" justify="center" pad="large">
          <Menu
            className="dashboard--content-blocks__button-footer"
            direction="row"
            inline
            responsive={false}
          >
            <Button
              label="submit"
              onClick={onSubmit}
              primary={true}
              type="submit"
            />
            <Button
              label="cancel"
              onClick={onCancel}
              primary={false}
            />
          </Menu>
        </Footer>
      </Section>
    </Box>
  );
}
