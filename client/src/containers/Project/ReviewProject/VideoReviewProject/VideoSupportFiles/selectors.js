import { createSelector } from 'reselect';

/**
 * Direct selector to the videoSupportFiles state
 */
const selectVideoSupportFiles = state => state.videoSupportFiles;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoSupportFiles
 */
const makeSelectVideoSupportFiles = props =>
  createSelector( selectVideoSupportFiles, substate => substate );

export default makeSelectVideoSupportFiles;
export { selectVideoSupportFiles };
