/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import { PageHeader, MarkdownHelp } from 'grommet-cms/components';

export default function MarkdownHelpLayer(props: {
  onClose: Function,
  isVisible: boolean
}) {
  const { isVisible, onClose } = props;
  return (
    <Layer
      flush
      hidden={!isVisible}
      onClose={onClose}
      closer={false}
      align="center"
    >
      <Box full="horizontal">
        <PageHeader
          title="Flex Box Help"
          controls={
            <Anchor
              onClick={onClose}
              icon={<CloseIcon />}
            />
          }
        />
        <Article pad="large" style={{ maxHeight: 'calc(100vh - 24px)', overflow: 'scroll' }}>
          <MarkdownHelp />
        </Article>
      </Box>
    </Layer>
  );
}

