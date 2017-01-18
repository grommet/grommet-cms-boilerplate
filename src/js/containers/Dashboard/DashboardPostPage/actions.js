/* @flow */
import * as T from './constants';
import type { DashboardPostPageAction } from './flowTypes';

export const toggleSectionForm = (index?: number): DashboardPostPageAction => ({
  type: T.SHOW_SECTION_FORM,
  index
});

export const postSectionFormInput = (name?: string, id?: string) => ({
  type: T.POST_SECTION_FORM_INPUT,
  name: name || '',
  id: id || ''
});
