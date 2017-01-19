/* @flow */
import * as T from './constants';
import type { DashboardPostPageAction, DashboardPostPageState } from './flowTypes';

export const initialState: DashboardPostPageState = {
  sectionForm: {
    isVisible: false,
    name: '',
    id: '',
    selectedSection: null
  }
};

const dashboardPost = (
  state: DashboardPostPageState = initialState,
  action: DashboardPostPageAction
): DashboardPostPageState => {
  switch (action.type) {
    case T.SHOW_SECTION_FORM:
      return {
        ...state,
        sectionForm: {
          ...state.sectionForm,
          isVisible: !state.sectionForm.isVisible,
          selectedSection: action.index
        }
      };
    case T.POST_SECTION_FORM_INPUT:
      return {
        ...state,
        sectionForm: {
          ...state.sectionForm,
          name: action.name,
          id: action.id
        }
      };
    default:
      return state;
  }
};

export default dashboardPost;
