/* @flow */
import React from 'react';
import Layer from 'grommet/components/Layer';
// $FlowFixMe
import MarqueeForm from 'grommet-cms/components';

export default function AddPostForm(props: {
  isVisible: boolean,
  onClose: Function,
  form: {
    onSubmit: Function,
    post?: {
      title?: string,
      subtitle?: string,
      date?: string,
      image?: string
    },
    url?: string,
    onChange: Function,
    onCreatePost: Function,
  }
}) {
  const { isVisible, onClose, form } = props;
  const { onSubmit, post, onChange, onCreatePost, url } = form;
  return (
    <Layer
      align="right"
      onClose={onClose}
      hidden={!isVisible}
    >
      <MarqueeForm
        onSubmit={onSubmit}
        post={post}
        onChange={onChange}
        onCreatePost={onCreatePost}
        url={url}
      />
    </Layer>
  );
}
