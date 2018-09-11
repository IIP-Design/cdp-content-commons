/*
 *
 * SelectRole actions
 *
 */

import {
  DEFAULT_ACTION,
  ROLE_SELECTION,
  TEAM_SELECTION
} from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
}

export const storeRole = role => ( {
  type: ROLE_SELECTION,
  payload: role
} );

export const storeTeam = team => ( {
  type: TEAM_SELECTION,
  payload: team
} );
