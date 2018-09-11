import { createSelector } from 'reselect';

/**
 * Direct selector to the selectRole state
 */
const selectSelectRole = state => state.selectRole;

/**
 * Other specific selectors
 */
const selectTeamRole = state => state.selectRole.role;
const selectTeams = state => state.selectRole.teams;
const selectTeamSelection = state => state.selectRole.teamSelection;

/**
 * Default selector used by SelectRole
 */
const makeSelectSelectRole = props =>
  createSelector( selectSelectRole, substate => substate );


export default makeSelectSelectRole;
export { selectTeamRole, selectTeams, selectTeamSelection };
