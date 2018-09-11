/*
 *
 * TeamDetails actions
 *
 */

import {
  DEFAULT_ACTION,
  TEAM_NAME,
  AGENCY_SELECTION,
  CONTENT_TYPE_SELECTION,
  ADD_TEAM
} from './constants';

export const defaultAction = () => {
  return {
    type: DEFAULT_ACTION
  };
}

export const storeTeamName = name => ( {
  type: TEAM_NAME,
  payload: name
} );

export const storeAgencySelection = agency => ( {
  type: AGENCY_SELECTION,
  payload: agency
} );

export const storeContentType = types => ( {
  type: CONTENT_TYPE_SELECTION,
  payload: types
} );

export const addTeam = newTeam => ( {
  type: ADD_TEAM,
  payload: { key: newTeam, text: newTeam, value: newTeam }
} );
