// @flow
export type SHOW_SECTION_FORM_TYPE =
  'DASHBOARD_POST_PAGE/SHOW_SECTION_FORM';
export type POST_SECTION_FORM_INPUT_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_INPUT';
export type POST_SECTION_FORM_RESET_TYPE =
  'DASHBOARD_POST_PAGE/POST_SECTION_FORM_RESET';

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

export type SectionForm = {
  isVisible: boolean,
  name: {
    value: ?string
  },
  selectedSection: ?number,
  padding: {
    value: string,
    options: ['none', 'small', 'medium', 'large']
  },
  basis: {
    value: string,
    options: [
      'xsmall', 'small',
      'medium', 'large',
      'xlarge', 'xxlarge',
      'full', '1/2',
      '1/3', '2/3',
      '1/4', '3/4',
      'none'
    ]
  },
  wrap: {
    value: boolean
  }
}

export type DashboardPostPageState = {
  sectionForm: SectionForm
}

export type DashboardPostPageAction = {
  type: SHOW_SECTION_FORM_TYPE | POST_SECTION_FORM_INPUT_TYPE,
  name?: string,
  value?: string,
  index?: ?number
}
