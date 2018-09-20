import { createSelector } from 'reselect';

/**
 * Direct selector to the videoProjectFiles state
 */
const selectVideoProjectFiles = state => state.videoProjectFiles;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoProjectFiles
 */
const makeSelectVideoProjectFiles = props =>
  createSelector( selectVideoProjectFiles, substate => substate );

export default makeSelectVideoProjectFiles;
export { selectVideoProjectFiles };
