import { createSelector } from 'reselect';

/**
 * Direct selector to the projectFiles state
 */
const selectProjectFiles = state => state.projectFiles;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectFiles
 */
const makeSelectProjectFiles = props =>
  createSelector( selectProjectFiles, substate => substate );

export default makeSelectProjectFiles;
export { selectProjectFiles };
