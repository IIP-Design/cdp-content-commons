import { SEARCH_FILTER_SELECTIONS_CLEAR } from './types';

export const clearFilterSelections = () => {
  localStorage.clear();
  return {
    type: SEARCH_FILTER_SELECTIONS_CLEAR,
    payload: null
  };
};

