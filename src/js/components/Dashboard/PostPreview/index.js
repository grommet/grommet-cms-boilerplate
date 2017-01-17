/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Section from 'grommet/components/Section';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import { ContentBlocks } from 'grommet-cms/containers';
import type ContentBlockType from './flowTypes';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';
import PostPreviewHeroSection from './heroSection';

export default function PostPreview(props: {
  post?: {
    image: Asset,
    title: string,
    subtitle?: string,
    sections?: Array<{
      contentBlocks: Array<ContentBlockType>
    }>
  },
  selectedSection?: number
}) {
  const { post, selectedSection } = props;
  const renderPostSections = selectedSection && selectedSection > 0;
  return (
    <Box>
      <PostPreviewHeroSection
        post={post}
        selectedSection={selectedSection}
      />
      {renderPostSections && post &&
        post.sections && post.sections
          .filter((_, i) => selectedSection === i)
          .map((item, i) => 
            <Section key={i} pad="medium">
              <ContentBlocks blocks={item.contentBlocks} />
            </Section>
          )
      }
    </Box>
  );
}
