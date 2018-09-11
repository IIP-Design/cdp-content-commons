/*
 *
 * UserDetails actions
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

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
}

export const storeFirstName = firstname => ( {
  type: FIRST_NAME,
  payload: firstname
} );

export const storeLastName = lastname => ( {
  type: LAST_NAME,
  payload: lastname
} );

export const storeEmail = email => ( {
  type: EMAIL_ADDRESS,
  payload: email
} );

export const storeJobTitle = jobtitle => ( {
  type: JOB_TITLE,
  payload: jobtitle
} );

export const storeCountry = country => ( {
  type: USER_COUNTRY,
  payload: country
} );

export const storeCity = city => ( {
  type: USER_CITY,
  payload: city
} );

export const storeReference = reference => ( {
  type: USER_REFERENCE,
  payload: reference
} );
