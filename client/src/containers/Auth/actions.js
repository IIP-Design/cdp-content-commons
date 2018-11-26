/*
 *
 * Auth actions
 *
 */
import { Auth, Cache } from 'aws-amplify';
import {
  LOGIN_ERROR,
  LOGIN_RESET_ERROR,
  LOGIN,
  LOGOUT
} from './constants';


/**
 *
 * @param {function} dispatch
 * @param {string|object} err
 */
const dispatchError = ( dispatch, err ) => {
  let msg = 'Login failed.';
  if ( err && err.error !== 'popup_closed_by_user' ) { // user closes window before selecting a google email
    if ( err.reason && err.reason.indexOf( 'Account domain does not match hosted_domain' ) !== -1 ) {
      msg = 'You must use an america.gov email address to login';
    }
    dispatch( {
      type: LOGIN_ERROR,
      payload: msg
    } );
  }
};

/**
 * Authenticate Google user against the Cognito identity pool
 * Cognito identity pool gives google user access to AWS services
 *
 * @param {object} googleUser Authenticated user returned from Google
 */
const federatedSignIn = async ( googleUser ) => {
  /* eslint-disable camelcase */
  const { id_token, expires_at } = googleUser.getAuthResponse();
  const profile = googleUser.getBasicProfile();
  const user = {
    email: profile.getEmail(),
    name: profile.getName()
  };

  await Auth.federatedSignIn(
    'google',
    { token: id_token, expires_at },
    user
  );

  // return the full authenticated object from Cache to avoind another call
  return Cache.getItem( 'federatedInfo' );
};

/**
 * Fetches a reference to the google api script that was added
 * when component <ButtonGoogle/> mounts
 */
const getGoogleApiRef = () => ( window.gapi && window.gapi.auth2
  ? window.gapi.auth2.getAuthInstance()
  : null );

/**
 * Login via Google and then authenticate the google user
 * against the aws identity pool to get access to aws services
 */
export const googleLogin = async () => {
  const ga = getGoogleApiRef();
  if ( ga ) {
    const googleUser = await ga.signIn();
    const user = await federatedSignIn( googleUser );
    return user;
  }
  throw new Error( 'Google is not available for authentication.' );
};


/**
 * Authenticate via Google
 *
 * @param {object} history routes user to page they loggedin from
 */
export const willGoogleLogin = history => async ( dispatch ) => {
  try {
    const user = await googleLogin();
    dispatch( {
      type: LOGIN,
      payload: user
    } );
    history.goBack();
  } catch ( err ) {
    dispatchError( dispatch, err );
  }
};

export const resetError = () => ( {
  type: LOGIN_RESET_ERROR,
  payload: ''
} );


export const login = () => async ( dispatch ) => {
  const federatedInfo = Cache.getItem( 'federatedInfo' );
  dispatch( {
    type: LOGIN,
    payload: federatedInfo
  } );
};

/**
 * Log user out.  Clears local storage of auth credentials
 */
export const logout = () => async ( dispatch ) => {
  Auth.signOut();
  dispatch( {
    type: LOGOUT,
    payload: ''
  } );
};
