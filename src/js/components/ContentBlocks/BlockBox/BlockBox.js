/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Markdown from 'grommet/components/Markdown';

export default function BlockBox(props: {
  content: ?string,
  colorIndex: ?string,
}) {
  const { content, colorIndex } = props;
  return (
    <Box
      align="center"
      justify="center"
      size={{ height: 'small' }}
      colorIndex={colorIndex || 'light-1'}
    >
      <Box pad="small">
        <Markdown
          content={content || ''}
          components={{
            'p': { 'props':  { size: 'large', margin: 'small' } },
            'h2': { 'props':  { strong: true } }
          }}
        />
      </Box>
    </Box>
  );
}
