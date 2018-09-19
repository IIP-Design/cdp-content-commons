/*
 *
 * ProjectFiles reducer
 *
 */

import { DEFAULT_ACTION } from './constants';


export const INITIAL_STATE = {};

function projectFilesReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;
      
    default:
      return state;
  }
}

export default projectFilesReducer;
