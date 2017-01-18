// @flow
export type SHOW_SECTION_FORM_TYPE = 'DASHBOARD_POST_PAGE/SHOW_SECTION_FORM';
export type POST_SECTION_FORM_INPUT_TYPE = 'DASHBOARD_POST_PAGE/POST_SECTION_FORM_INPUT';

export type DashboardPostPageState = {
  sectionForm: {
    isVisible: boolean,
    id?: string,
    name?: string,
    selectedSection: ?number
  }
}

export type DashboardPostPageAction = {
  type: SHOW_SECTION_FORM_TYPE | POST_SECTION_FORM_INPUT_TYPE,
  name?: string,
  id?: string,
  index?: number
}
