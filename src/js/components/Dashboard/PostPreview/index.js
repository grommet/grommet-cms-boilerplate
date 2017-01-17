/* @flow */
import React from 'react';
import Hero from 'grommet/components/Hero';
import Image from 'grommet/components/Image';
import Box from 'grommet/components/Box';
import Headline from 'grommet/components/Headline';
import Label from 'grommet/components/Label';
import Section from 'grommet/components/Section';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import { ContentBlocks } from 'grommet-cms/containers';
import type ContentBlockType from './flowTypes';
// $FlowFixMe required module not found. See here: https://github.com/facebook/flow/issues/101
import type { Asset } from 'grommet-cms/containers/Assets/flowTypes';

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
  return (
    <Box>
      {post && selectedSection == null && 
        <Box>
          <Hero
            className="post-preview--hero"
            size="medium"
            colorIndex="grey-2-a"
            background={post.image ? <Image src={post.image.path} fit="cover" /> : null}
          >
            <Box direction="row" pad="medium">
              {post.title &&
                <Box colorIndex="grey-2-a" basis="full" pad="medium">
                  <Headline size="medium" strong className="post-preview--hero__headline">
                    {post.title}
                  </Headline>
                  <Label truncate uppercase>
                    {post.subtitle || ''}
                  </Label>
                </Box>
              }
            </Box>
          </Hero>
        </Box>
      }
      {post && post.sections &&
        post.sections.filter((_, i) => selectedSection === i).map((item, i) => 
          <Section pad="medium">
            <ContentBlocks blocks={item.contentBlocks} />
          </Section>  
        )
      }
    </Box>
  );
}
