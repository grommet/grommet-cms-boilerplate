/* @flow */
import * as T from './constants';
import type {
  DashboardPostPageAction,
  DashboardPostPageState
} from './flowTypes';

export const initialState: DashboardPostPageState = {
  toastMessage: null,
  sectionLayoutForm: {
    showAdvancedLayoutOptions: true,
    showHelp: false,
    isVisible: false,
    title: "Section Layout",
    subtitle: "Set the layout of the section / flex container",
    selectedSection: null,
    name: {
      value: ''
    },
    fields: [
      {
        label: "Flex Direction",
        help: "How should the content flow?  Row: left to right, Column: top to bottom.",
        name: "direction",
        type: "Select",
        options: ["row", "column"],
        value: 'row'
      },
      {
        label: "Justify Content",
        help: {
          row: "Justify content to the left / right.",
          column: "Justify content to the top / bottom."
        },
        name: "justify",
        type: "Select",
        options: ["start", "center", "between", "end"],
        value: 'start'
      },
      {
        label: "Align Items",
        help: {
          row: "Align items to the top / bottom.",
          column: "Aligns items to the left / right."
        },
        name: "align",
        type: "Select",
        options: ["start", "center", "end", "baseline", "stretch"],
        value: 'start'
      },
      {
        label: "Padding",
        name: "pad",
        help: "How much space should the container add around content?",
        type: "Select",
        options: ["small", "medium", "large", "none"],
        value: 'small'
      },
      {
        label: "Full",
        help: "Should the section span the full width / height of the container.",
        name: "full",
        type: "Select",
        options: ["horizontal", "vertical", "true", "false"],
        value: 'false'
      },
      {
        label: 'Wrap',
        help: "Should the content ever wrap onto a new line?",
        name: 'wrap',
        type: 'Select',
        options: ["true", "false"],
        value: 'false'
      },
      {
        label: "Flex Basis",
        help: "The basis of inner items.  Prefer setting item size vs. flex-basis.",
        name: "basis",
        type: "Select",
        options: ["xsmall", "small", "medium", "large", "xlarge", "xxlarge", "full", "1/2", "1/3", "2/3", "1/4", "3/4"],
        value: 'full'
      }
    ]
  },
  boxLayoutForm: {
    selectedContentBlockId: null,
    isVisible: false,
    title: "Box Layout",
    fields: [
      {
        label: "Padding",
        name: "pad",
        type: "Select",
        options: ["small", "medium", "large", "none"],
        value: 'small'
      },
      {
        label: "Size",
        name: "size",
        type: "Select",
        options: ["auto", "xsmall", "small", "medium", "large", "xlarge", "xxlarge", "full"],
        value: 'auto'
      },
      {
        label: "Flex",
        name: "flex",
        type: "Select",
        options: ["grow", "shrink", "true", "false"],
        value: 'false'
      }
    ]
  }
};

const dashboardPost = (
  state: DashboardPostPageState = initialState,
  action: DashboardPostPageAction
): DashboardPostPageState => {
  switch (action.type) {
    case T.POST_TOGGLE_HELP:
      return {
        ...state,
        sectionLayoutForm: {
          ...state.sectionLayoutForm,
          showHelp: !state.sectionLayoutForm.showHelp
        }
      };
    case T.POST_TOGGLE_ADVANCED_LAYOUT:
      return {
        ...state,
        sectionLayoutForm: {
          ...state.sectionLayoutForm,
          showAdvancedLayoutOptions: 
            !state.sectionLayoutForm.showAdvancedLayoutOptions
        }
      };
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
      return {
        ...state,
        sectionLayoutForm: initialState.sectionLayoutForm
      };
    case T.POST_BOX_LAYOUT_FORM_RESET:
      return {
        ...state,
        boxLayoutForm: initialState.boxLayoutForm
      };
    case T.SHOW_BOX_LAYOUT_FORM:
      return {
        ...state,
        boxLayoutForm: {
          ...state.boxLayoutForm,
          isVisible: !state.boxLayoutForm.isVisible,
          selectedContentBlockId: action.index
        }
      };
    case T.SHOW_SECTION_FORM:
      return {
        ...state,
        sectionLayoutForm: {
          ...state.sectionLayoutForm,
          isVisible: !state.sectionLayoutForm.isVisible,
          selectedSection: action.index
        }
      };
    case T.POST_SECTION_FORM_INPUT: {
      if (action.name === 'name') {
        return {
          ...state,
          sectionLayoutForm: {
            ...state.sectionLayoutForm,
            name: {
              value: action.value || ''
            }
          }
        };
      } else {
        const field = state.sectionLayoutForm.fields
          .filter((item) => item.name === action.name)[0];
        const index = state.sectionLayoutForm.fields.indexOf(field);
        return {
          ...state,
          sectionLayoutForm: {
            ...state.sectionLayoutForm,
            fields: [
              ...state.sectionLayoutForm.fields.slice(0, index),
              {
                ...state.sectionLayoutForm.fields[index],
                value: action.value || ''
              },
              ...state.sectionLayoutForm.fields.slice(index + 1)
            ]
          }
        };
      }
    }
    case T.POST_BOX_LAYOUT_FORM_INPUT: {
      const field = state.boxLayoutForm.fields
        .filter((item) => item.name === action.name)[0];
      const index = state.boxLayoutForm.fields.indexOf(field);
      return {
        ...state,
        boxLayoutForm: {
          ...state.boxLayoutForm,
          fields: [
            ...state.boxLayoutForm.fields.slice(0, index),
            {
              ...state.boxLayoutForm.fields[index],
              value: action.value
            },
            ...state.boxLayoutForm.fields.slice(index + 1)
          ]
        }
      };
    }
    default:
      return state;
  }
};

export default dashboardPost;
