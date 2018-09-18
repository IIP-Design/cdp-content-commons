import { createSelector } from 'reselect';

/**
 * Direct selector to the EditProject state
 */
const selectEditProject = state => state.EditProject;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditProject
 */
const makeSelectEditProject = props =>
  createSelector( selectEditProject, substate => substate );

export default makeSelectEditProject;
export { selectEditProject };
