/*
 *
 * PageLogin reducer
 *
 */
import { Cache } from 'aws-amplify';
import {
  LOGIN,
  LOGOUT,
  LOGIN_ERROR
} from './constants';


export const INITIAL_STATE = {
  authenticated: Cache.getItem( 'federatedInfo' ),
  errorMessage: ''
};

function authReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case LOGIN:
      return {
        ...state,
        authenticated: action.payload
      };

    case LOGOUT:
      return {
        ...state,
        authenticated: null
      };

    case LOGIN_ERROR:
      return {
        ...state,
        errorMessage: 'Error message'
      };

    default:
      return state;
  }
}

export default authReducer;
