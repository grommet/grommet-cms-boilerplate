// @flow
export type SHOW_SECTION_FORM_TYPE =
  'DASHBOARD_POST_PAGE/SHOW_SECTION_FORM';
export type POST_SECTION_FORM_INPUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_INPUT';
export type POST_SECTION_FORM_RESET_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_RESET';
export type POST_SECTION_SET_MESSAGE_TYPE = 
  'DASHBOARD_POST_PAGE/POST_SECTION_SET_MESSAGE';
export type POST_SECTION_CLEAR_MESSAGE_TYPE = 
  'DASHBOARD_POST_PAGE/POST_SECTION_CLEAR_MESSAGE';

export type PaddingOptions = 'none' | 'small' | 'medium' | 'large';
export type BasisOptions = 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge' |
  'xxlarge' | 'full' | '1/2' | '1/3' | '2/3' | '1/4' | '3/4' | 'none';

export type SectionFormSubmission = {
  name: string,
  id: string,
  padding: PaddingOptions,
  basis: BasisOptions,
  wrap: boolean
}

export type LayoutForm = {
  isVisible: boolean,
  name: {
    value: string
  },
  selectedSection: ?number,
  sections: Array<{
    title: string,
    fields: Array<{
      label: string,
      name: string,
      type: "Select",
      options: Array<string>,
      value: ?string
    }>
  }>
}

export type DashboardPostPageState = {
  toastMessage: ?string,
  layoutForm: LayoutForm
}

export type DashboardPostPageAction = {
  type: SHOW_SECTION_FORM_TYPE |  POST_SECTION_FORM_INPUT_TYPE | 
    POST_SECTION_FORM_RESET_TYPE | POST_SECTION_SET_MESSAGE_TYPE | 
      POST_SECTION_CLEAR_MESSAGE_TYPE,
  name?: string,
  value?: string,
  index?: ?number,
  options?: any,
  message?: string,
  sectionIndex?: number
}
