import { createSelector } from 'reselect';

/**
 * Direct selector to the videoEditProject state
 */
const selectVideoEditProject = state => state.videoEditProject;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoEditProject
 */
const makeSelectVideoEditProject = props =>
  createSelector( selectVideoEditProject, substate => substate );

export default makeSelectVideoEditProject;
export { selectVideoEditProject };
