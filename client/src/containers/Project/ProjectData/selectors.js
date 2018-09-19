import { createSelector } from 'reselect';

/**
 * Direct selector to the projectData state
 */
const selectProjectData = state => state.projectData;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectData
 */
const makeSelectProjectData = props =>
  createSelector( selectProjectData, substate => substate );

export default makeSelectProjectData;
export { selectProjectData };
