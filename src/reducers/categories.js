import {
  LOAD_CATEGORIES_PENDING,
  LOAD_CATEGORIES_FAILED,
  LOAD_CATEGORIES_SUCCESS,
  CATEGORY_CHANGE,
  SEARCH_FILTER_SELECTIONS_CLEAR
} from '../actions/types';
import { localStorageInitFilterState } from '../utils/localStorage';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentCategories: localStorageInitFilterState( 'category' ) !== null
    ? localStorageInitFilterState( 'category' )
    : []
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_CATEGORIES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_CATEGORIES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_CATEGORIES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case CATEGORY_CHANGE:
      // if there is no payload, clear selected categories
      if ( !action.payload ) {
        return { ...state, currentCategories: [] };
      }
      return {
        ...state,
        currentCategories: action.payload.checked
          ? [...state.currentCategories, { id: action.payload.id, display_name: action.payload.display_name }]
          : state.currentCategories.filter( category => category.id !== action.payload.id )
      };
    case SEARCH_FILTER_SELECTIONS_CLEAR:
      return {
        ...state,
        currentCategories: []
      };
    default:
      return state;
  }
};
