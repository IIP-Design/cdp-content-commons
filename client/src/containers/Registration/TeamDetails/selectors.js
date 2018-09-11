import { createSelector } from 'reselect';

/**
 * Direct selector to the teamDetails state
 */
const selectTeamDetails = state => state.teamDetails;

/**
 * Other specific selectors
 */
 const selectTeamName = state => state.teamDetails.teamName;
 const selectAgencySelection = state => state.teamDetails.agencySelection;
 const selectContentType = state => state.teamDetails.contentType;
 const selectAgencies = state => state.teamDetails.agencies;
 const selectContentTypes = state => state.teamDetails.contentTypes;

/**
 * Default selector used by TeamDetails
 */
const makeSelectTeamDetails = props =>
  createSelector( selectTeamDetails, substate => substate );

export default makeSelectTeamDetails;
export {
  selectTeamName,
  selectAgencySelection,
  selectContentType,
  selectAgencies,
  selectContentTypes
};
