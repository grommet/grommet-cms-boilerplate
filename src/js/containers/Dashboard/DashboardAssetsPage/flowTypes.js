import type { GrommetCustomTypes$SelectValueType } from 'grommet';

export type TOGGLE_FORM_TYPE = 'ASSET_PAGE/TOGGLE_FORM';
export type SET_FORM_OPTIONS_TYPE = 'ASSET_PAGE/SET_FORM_OPTIONS';

type DashboardAssetsPageFormType = {
  value: string,
  options: GrommetCustomTypes$SelectValueType[],
  inline: true,
  multiple: true
}

export type DashboardAssetsPageState = {
  searchTerm: string,
  layerVisible: boolean,
  form: DashboardAssetsPageFormType
}

export type DashboardAssetsPageAction = {
  type: TOGGLE_FORM_TYPE
}

export type DashboardAssetsPageProps = {
  layerVisible: boolean,
  searchTerm: string,
  form: DashboardAssetsPageFormType,
  actions: {
    toggleForm: () => void
  }
}
