import { createSelector } from 'reselect';

/**
 * Direct selector to the VideoEditProject state
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
