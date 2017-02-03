/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import { ContentBlocks } from 'grommet-cms/containers';
import type ContentBlockType from './flowTypes';
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';
import PostPreviewHeroSection from './heroSection';

export default function PostPreview(props: {
  post?: {
    image: Asset,
    title: string,
    subtitle?: string,
    sections?: Array<{
      contentBlocks: Array<ContentBlockType>,
      layout: Array<{
        value: string,
        name: string
      }>
    }>
  },
  selectedSection?: number
}) {
  const { post, selectedSection } = props;
  return (
    <Box>
      <PostPreviewHeroSection
        post={post}
        selectedSection={selectedSection}
      />
      {(selectedSection && selectedSection > 0) &&
        (post && post.sections)
        ? post.sections
          .filter((_, i) => selectedSection === i)
          .map((item, i) =>
            <ContentBlocks
              layout={item.layout}
              key={i}
              blocks={item.contentBlocks}
            />
          )
        :
          null
      }
    </Box>
  );
}
