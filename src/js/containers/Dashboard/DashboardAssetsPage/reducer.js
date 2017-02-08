import * as ActionTypes from './constants';
import type { DashboardAssetsPageState, DashboardAssetsPageAction } from './flowTypes';

const initialState: DashboardAssetsPageState = {
  layerVisible: false,
  searchTerm: '',
  form: {
    value: '',
    options: [],
    inline: true,
    multiple: true
  }
};

export default function assetsPage(
  state: DashboardAssetsPageState = initialState,
  action: DashboardAssetsPageAction
): DashboardAssetsPageState {
  switch(action.type) {
    case ActionTypes.TOGGLE_FORM:
      return {
        ...state,
        layerVisible: !state.layerVisible
      };
    default:
      return state;
  }
}
