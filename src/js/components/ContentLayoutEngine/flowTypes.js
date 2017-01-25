/* @flow */
import type {
  ContentBlockType
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
