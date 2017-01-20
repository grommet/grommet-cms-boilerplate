/* @flow */
import * as T from './constants';
import type {
  DashboardPostPageAction,
  DashboardPostPageState
} from './flowTypes';

export const initialState: DashboardPostPageState = {
  sectionForm: {
    isVisible: false,
    name: '',
    id: '',
    selectedSection: null,
    padding: {
      value: 'none',
      options: ['none', 'small', 'medium', 'large']
    },
    basis: {
      value: null,
      options: [
        'xsmall', 'small',
        'medium', 'large',
        'xlarge', 'xxlarge',
        'full', '1/2',
        '1/3', '2/3',
        '1/4', '3/4'
      ]
    },
    wrap: {
      value: false
    }
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
    case T.POST_SECTION_FORM_INPUT: {
      const name = action.name || '';
      const value = action.value || '';
      let newSectionForm = state.sectionForm;
      if (name === 'name') {
        newSectionForm = {
          ...state.sectionForm,
          name: action.value
        };
      } else if (name === 'wrap') {
        newSectionForm = {
          ...state.sectionForm,
          wrap: {
            value: !state.sectionForm.wrap.value
          }
        };
      } else {
        newSectionForm = {
          ...state.sectionForm,
          [`${name}`]: {
            ...state.sectionForm[`${name}`],
            value
          }
        };
      }
      return {
        ...state,
        sectionForm: newSectionForm
      };
    }
    default:
      return state;
  }
};

export default dashboardPost;
