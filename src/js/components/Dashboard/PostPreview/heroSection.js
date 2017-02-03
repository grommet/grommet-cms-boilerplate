/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Heading from 'grommet/components/Heading';
import Label from 'grommet/components/Label';
import { ContentBlocks } from 'grommet-cms/containers';
import type ContentBlockType from './flowTypes';
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';

export default function PostPreviewHeroSection(props: {
  post?: {
    image: Asset,
    title: string,
    subtitle?: string,
    sections?: Array<{
      layout: Array<{
        value: string,
        name: string
      }>,
      contentBlocks: Array<ContentBlockType>
    }>
  },
  selectedSection?: number
}) {
  const { post, selectedSection } = props;
  if (post && (selectedSection == null || selectedSection === 0)) {
    return (
      <Box>
        {post.title &&
          <Box pad="medium">
            <Heading>
              {post.title}
            </Heading>
            <Label>
              {post.subtitle || ''}
            </Label>
          </Box>
        }
        {post.sections &&
          post.sections.length > 0 &&
            post.sections.map((item, i) =>
              <ContentBlocks
                key={i}
                layout={item.layout}
                blocks={item.contentBlocks}
              />
        )}
      </Box>
    );
  }
  return null;
}
