/*
 *
 * SelectRole reducer
 *
 */

import {
  DEFAULT_ACTION,
  ROLE_SELECTION,
  TEAM_SELECTION,
  ADD_TEAM
} from './constants';


export const INITIAL_STATE = {
  role: '',
  teams: [
    { key: 'team1', text: 'Team 1', value: 'team_1' },
    { key: 'team2', text: 'Team 2', value: 'team_2' },
    { key: 'team3', text: 'Team 3', value: 'team_3' },
    { key: 'team4', text: 'Team 4', value: 'team_4' },
    { key: 'team5', text: 'Team 5', value: 'team_5' }
  ],
  teamSelection: ''
};

function selectRoleReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case DEFAULT_ACTION:
      return state;

    case ROLE_SELECTION:
      return {
        ...state,
        role: action.payload
      };

    case TEAM_SELECTION:
      return {
        ...state,
        teamSelection: action.payload
      };

    case ADD_TEAM:
      return {
        ...state,
        teams: [...state.teams, action.payload]
      };
      
    default:
      return state;
  }
}

export default selectRoleReducer;
