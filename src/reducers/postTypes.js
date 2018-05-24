import {
  LOAD_POST_TYPES_PENDING,
  LOAD_POST_TYPES_FAILED,
  LOAD_POST_TYPES_SUCCESS,
  POST_TYPE_CHANGE,
  POST_TYPE_QUERY_UPDATE
} from '../actions/types';

import { localStorageInitFilterState } from '../utils/localStorage';

const INITIAL_STATE = {
  error: false,
  list: [],
  loading: false,
  // currentPostTypes: [{ type: 'video', display_name: 'Video' }]
  currentPostTypes: localStorageInitFilterState( 'format' ) !== null
    ? localStorageInitFilterState( 'format' )
    : [{ type: 'video', display_name: 'Video' }]
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case LOAD_POST_TYPES_PENDING:
      return {
        ...state,
        loading: true
      };
    case LOAD_POST_TYPES_FAILED:
      return {
        ...state,
        ...INITIAL_STATE,
        error: true,
        loading: false
      };
    case LOAD_POST_TYPES_SUCCESS:
      return {
        ...state,
        error: true,
        loading: false,
        list: action.payload
      };
    case POST_TYPE_CHANGE:
      // if there is no payload, clear selected currentPostTypes
      if ( !action.payload ) {
        return { ...state, currentPostTypes: [] };
      }
      return {
        ...state,
        currentPostTypes: action.payload.checked
          ? [...state.currentPostTypes, { type: action.payload.type, display_name: action.payload.display_name }]
          : state.currentPostTypes.filter( category => category.type !== action.payload.type )
      };
    case POST_TYPE_QUERY_UPDATE:
      return {
        ...state,
        currentPostTypes: [{ type: 'video', display_name: 'Video' }]
      };
    default:
      return state;
  }
};
