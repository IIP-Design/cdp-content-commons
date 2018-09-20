import { createSelector } from 'reselect';

/**
 * Direct selector to the videoProjectData state
 */
const selectVideoProjectData = state => state.videoProjectData;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoProjectData
 */
const makeSelectVideoProjectData = props =>
  createSelector( selectVideoProjectData, substate => substate );

export default makeSelectVideoProjectData;
export { selectVideoProjectData };
