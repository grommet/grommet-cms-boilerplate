/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
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
  }
}) {
  const { item } = props;
  return (
    <Box>
      <PageHeader title={`Edit ${item.name}`} />
      <DashboardContentBlocks contentBlocks={item.contentBlocks} />
    </Box>
  );
}
