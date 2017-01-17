/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
import Footer from 'grommet/components/Footer';
import Menu from 'grommet/components/Menu';
import Button from 'grommet/components/Button';
// import MarqueeForm from 'grommet-cms/components';
// $FlowFixMe
import { DashboardContentBlocks } from 'grommet-cms/containers';
// $FlowFixMe
import { PageHeader } from 'grommet-cms/components';

export default function PostListItemDetail(props: {
  item: {
    order: number,
    id: string,
    name: string,
    contentBlocks: Array<{}>
  },
  onSubmit: Function,
  onCreateBlockClick: Function
}) {
  const { item, onSubmit, onCreateBlockClick } = props;
  return (
    <Box>
      <PageHeader title={`Edit ${item.name}`} />
      <Section pad="medium">
        <Box pad="small">
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
                label="add block"
                onClick={onCreateBlockClick}
                primary={false}
              />
            </Menu>
          </Footer>
        </Box>
      </Section>
    </Box>
  );
}
