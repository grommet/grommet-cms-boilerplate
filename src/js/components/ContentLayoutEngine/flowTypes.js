/* @flow */
import type {
  ContentBlockType
  // $FlowFixMe required module not found
} from 'grommet-cms/components/Dashboard/PostPreview/flowTypes';

type LayoutType = {
  name: string,
  value: string
};

export type LayoutProps = {
  children: Array<React$Element<any>>,
  layout: Array<LayoutType>,
  blocks: Array<ContentBlockType>
};
