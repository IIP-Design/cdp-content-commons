/*
 *
 * VideoItem reducer
 *
 */

import { DEFAULT_ACTION } from './constants';
import { projects } from '../../mockData';


export const INITIAL_STATE = projects;

function videoItemReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;

    default:
      return state;
  }
}

export default videoItemReducer;
