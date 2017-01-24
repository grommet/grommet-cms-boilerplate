/* @flow */
import * as T from './constants';
import type {
  DashboardPostPageAction,
  DashboardPostPageState
} from './flowTypes';

export const initialState: DashboardPostPageState = {
  toastMessage: null,
  layoutForm: {
    isVisible: false,
    selectedSection: null,
    name: {
      value: ''
    },
    sections: [
      {
        title: "Section Layout",
        fields: [
          {
            label: "Padding",
            name: "pad",
            type: "Select",
            options: ["small", "medium", "large", "none"],
            value: ''
          },
          {
            label: "Flex Basis",
            name: "basis",
            type: "Select",
            options: ["xsmall", "small", "medium", "large", "xlarge", "xxlarge", "full", "1/2", "1/3", "2/3", "1/4", "3/4"],
            value: ''
          },
          {
            label: "Flex Direction",
            name: "direction",
            type: "Select",
            options: ["row", "column"],
            value: ''
          },
          {
            label: "Justify Content",
            name: "justify",
            type: "Select",
            options: ["start", "center", "between", "end"],
            value: ''
          },
          {
            label: "Align Items",
            name: "align",
            type: "Select",
            options: ["start", "center", "end", "baseline", "stretch"],
            value: ''
          },
          {
            label: "Full",
            name: "full",
            type: "Select",
            options: ["horizontal", "vertical", "true", "false"],
            value: ''
          },
          {
            label: 'Wrap',
            name: 'wrap',
            type: 'Select',
            options: ["true", "false"],
            value: ''
          }
        ]
      },
      {
        title: "Box Layout",
        fields: [
          {
            label: "Padding",
            name: "pad",
            type: "Select",
            options: ["small", "medium", "large", "none"],
            value: ''
          },
          {
            label: "Size",
            name: "size",
            type: "Select",
            options: ["auto", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "full"],
            value: ''
          },
          {
            label: "Flox",
            name: "flex",
            type: "Select",
            options: ["grow", "shrink", "true", "false"],
            value: ''
          }
        ]
      }
    ]
  }
};

const dashboardPost = (
  state: DashboardPostPageState = initialState,
  action: DashboardPostPageAction
): DashboardPostPageState => {
  switch (action.type) {
    case T.POST_SECTION_SET_MESSAGE:
      return {
        ...state,
        toastMessage: action.message
      };
    case T.POST_SECTION_CLEAR_MESSAGE:
      return {
        ...state,
        toastMessage: null
      };
    case T.POST_SECTION_FORM_RESET:
      return initialState;
    case T.SHOW_SECTION_FORM:
      return {
        ...state,
        layoutForm: {
          ...state.layoutForm,
          isVisible: !state.layoutForm.isVisible,
          selectedSection: action.index
        }
      };
    case T.POST_SECTION_FORM_INPUT: {
      const sectionIndex = action.sectionIndex || 0;
      const section = state.layoutForm.sections[sectionIndex];
      const field = section.fields
        .filter((item) => item.name === action.name)[0];
      const index = section.fields.indexOf(field);
      const newSection = {
        ...section,
        fields: [
          ...section.fields.slice(0, index),
          {
            ...field,
            value: action.value
          },
          ...section.fields.slice(index + 1)
        ]
      };
      return {
        ...state,
        layoutForm: {
          ...state.layoutForm,
          sections: [
            ...state.layoutForm.sections.slice(0, action.sectionIndex),
            newSection,
            ...state.layoutForm.sections.slice(action.sectionIndex + 1)
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default dashboardPost;
