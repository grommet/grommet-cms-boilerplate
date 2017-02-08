/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
import Box from 'grommet/components/Box';
import Article from 'grommet/components/Article';
import CloseIcon from 'grommet/components/icons/base/Close';
import Anchor from 'grommet/components/Anchor';
import Title from 'grommet/components/Title';
import Button from 'grommet/components/Button';
import CircleQuestionIcon from 'grommet/components/icons/base/CircleQuestion';
import { PageHeader, MarkdownHelp } from 'grommet-cms/components';

export default function MarkdownHelpLayer(props: {
  onToggle: Function,
  isVisible: boolean
}) {
  const { isVisible, onToggle } = props;
  if (!isVisible) {
    return (
      <Box direction="row" align="center" justify="start" pad={{ vertical: 'medium' }}>
        <Title>Markdown Supported</Title>
        <Button
          plain
          onClick={onToggle}
          icon={<CircleQuestionIcon />}
        />
      </Box>
    );
  }
  return (
    <Layer
      flush
      hidden={!isVisible}
      onClose={onToggle}
      closer={false}
      align="center"
    >
      <Box full="horizontal">
        <PageHeader
          title="Markdown Help"
          controls={
            <Anchor
              onClick={onToggle}
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

