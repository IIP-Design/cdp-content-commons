/*
 *
 * UserDetails reducer
 *
 */

import {
  DEFAULT_ACTION,
  FIRST_NAME,
  LAST_NAME,
  EMAIL_ADDRESS,
  JOB_TITLE,
  USER_COUNTRY,
  USER_CITY,
  USER_REFERENCE
} from './constants';


export const INITIAL_STATE = {};

function userDetailsReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;

    case FIRST_NAME:
      return {
        ...state,
        firstName: action.payload
      };

    case LAST_NAME:
      return {
        ...state,
        lastName: action.payload
      };

    case EMAIL_ADDRESS:
      return {
        ...state,
        email: action.payload
      };

    case JOB_TITLE:
      return {
        ...state,
        jobTitle: action.payload
      };

    case USER_COUNTRY:
      return {
        ...state,
        country: action.payload
      };

    case USER_CITY:
      return {
        ...state,
        city: action.payload
      };

    case USER_REFERENCE:
      return {
        ...state,
        reference: action.payload
      };
      
    default:
      return state;
  }
}

export default userDetailsReducer;
