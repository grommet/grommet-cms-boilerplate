/* @flow */
import * as T from './constants';
import type { DashboardPostPageAction } from './flowTypes';

export const toggleSectionForm =
  (index: ?number): DashboardPostPageAction => ({
    type: T.SHOW_SECTION_FORM,
    index
  });

export const postSectionFormInput = 
  (name?: string, value?: string, sectionIndex: number): DashboardPostPageAction => ({
    type: T.POST_SECTION_FORM_INPUT,
    name: name || '',
    sectionIndex,
    value: value || ''
  });

export const postSectionFormReset =
  (options: any): DashboardPostPageAction => ({
    type: T.POST_SECTION_FORM_RESET,
    options
  });

export const postSectionSetToastMessage = 
  (message: string): DashboardPostPageAction => ({
    type: T.POST_SECTION_SET_MESSAGE,
    message
  });

export const postSectionClearToastMessage = (): DashboardPostPageAction => ({
  type: T.POST_SECTION_CLEAR_MESSAGE
});
