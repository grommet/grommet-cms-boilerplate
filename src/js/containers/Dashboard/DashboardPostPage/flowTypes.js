// @flow
export type SHOW_SECTION_FORM_TYPE =
  'DASHBOARD_POST_PAGE/SHOW_SECTION_FORM';
export type POST_SECTION_FORM_INPUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_INPUT';

export type DashboardPostPageState = {
  sectionForm: {
    isVisible: boolean,
    id?: string,
    name?: string,
    selectedSection: ?number,
    padding: {
      value: ?string,
      options: ['none', 'small', 'medium', 'large']
    },
    basis: {
      value?: ?string,
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
      value: boolean
    }
  }
}

export type DashboardPostPageAction = {
  type: SHOW_SECTION_FORM_TYPE | POST_SECTION_FORM_INPUT_TYPE,
  name?: string,
  value?: string,
  index?: number
}
