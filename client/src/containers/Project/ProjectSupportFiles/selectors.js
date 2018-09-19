import { createSelector } from 'reselect';

/**
 * Direct selector to the projectSupportFiles state
 */
const selectProjectSupportFiles = state => state.projectSupportFiles;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectSupportFiles
 */
const makeSelectProjectSupportFiles = props =>
  createSelector( selectProjectSupportFiles, substate => substate );

export default makeSelectProjectSupportFiles;
export { selectProjectSupportFiles };
