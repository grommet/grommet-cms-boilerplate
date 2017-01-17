/* @flow */
import React from 'react';
import Box from 'grommet/components/Box';
import Anchor from 'grommet/components/Anchor';
import Heading from 'grommet/components/Heading';
import Section from 'grommet/components/Section';
// $FlowFixMe grommet-cms required module not found
import { formatPrettyDate } from 'grommet-cms/utils';

export default function PostFeedItem(props: {
  post: {
    title: string,
    image: Object,
    slug: string,
    createdAt: string
  },
  colorIndex: string,
  postPath: string,
}) {
  const { post, postPath, colorIndex } = props;
  console.log('image', post.image.path, post);
  return (
    <Anchor className="post-feed-item--anchor" href={`${postPath}${post.slug}`}>
      <Section
        full
        colorIndex={colorIndex}
        texture={post.image.path}
        pad="large"
      >
        <Box
          align="center"
          justify="start"
          pad={{ vertical: 'large' }}
          full
        >
          <Heading strong align="center">
            {post.title}
          </Heading>
          <Heading align="center" tag="h3">
            {`Posted on ${formatPrettyDate(post.createdAt)}`}
          </Heading>
        </Box>
      </Section>
    </Anchor>
  );
}
