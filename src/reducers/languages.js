import {
  LOAD_LANGUAGES_PENDING,
  LOAD_LANGUAGES_FAILED,
  LOAD_LANGUAGES_SUCCESS,
  LANGUAGE_CHANGE,
  SEARCH_FILTER_SELECTIONS_CLEAR
} from '../actions/types';
import { localStorageInitFilterState } from '../utils/localStorage';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentLanguage: localStorageInitFilterState( 'language' ) !== null
    ? localStorageInitFilterState( 'language' )[0]
    : { key: 'en-us', display_name: 'English' }
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_LANGUAGES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_LANGUAGES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_LANGUAGES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case LANGUAGE_CHANGE:
      return {
        ...state,
        currentLanguage: action.payload ? action.payload : { key: 'en-us', display_name: 'English' }
      };
    case SEARCH_FILTER_SELECTIONS_CLEAR:
      return {
        ...state,
        currentLanguage: { key: 'en-us', display_name: 'English' }
      };
    default:
      return state;
  }
};
