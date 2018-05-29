import { SEARCH_FILTER_SELECTIONS_STORE } from '../actions/types';

export default ( state = [], action ) => {
  switch ( action.type ) {
    case SEARCH_FILTER_SELECTIONS_STORE:
      return [...state, ...action.payload];
    default:
      return state;
  }
};
