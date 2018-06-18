import {
  LOAD_SOURCES_PENDING,
  LOAD_SOURCES_FAILED,
  LOAD_SOURCES_SUCCESS,
  SOURCE_CHANGE,
  SEARCH_FILTER_SELECTIONS_CLEAR
} from '../actions/types';
import { localStorageInitFilterState } from '../utils/localStorage';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  currentSources: localStorageInitFilterState( 'source' ) !== null
    ? localStorageInitFilterState( 'source' )
    : []
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_SOURCES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_SOURCES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_SOURCES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case SOURCE_CHANGE:
      // if there is no payload, clear selected currentPostTypes
      if ( !action.payload ) {
        return { ...state, currentSources: [] };
      }
      return {
        ...state,
        currentSources: action.payload.checked
          ? [...state.currentSources, { key: action.payload.key, display_name: action.payload.display_name }]
          : state.currentSources.filter( source => source.display_name !== action.payload.display_name )
      };
    case SEARCH_FILTER_SELECTIONS_CLEAR:
      return {
        ...state,
        currentSources: []
      };
    default:
      return state;
  }
};
