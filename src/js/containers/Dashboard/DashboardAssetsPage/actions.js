import type { GrommetCustomTypes$SelectValueType } from 'grommet';
import type { DashboardAssetsPageAction } from './flowTypes';
import * as ActionTypes from './constants';

export const toggleForm = (): DashboardAssetsPageAction => ({
  type: ActionTypes.TOGGLE_FORM
});

export const setFormOptions =
  (options: GrommetCustomTypes$SelectValueType[]):
    DashboardAssetsPageAction => ({
      type: ActionTypes.SET_FORM_OPTIONS,
      options
    });

export const setSearchTerm = (term: string): DashboardAssetsPageAction => ({
  type: ActionTypes.SET_SEARCH_TERM,
  term
});
