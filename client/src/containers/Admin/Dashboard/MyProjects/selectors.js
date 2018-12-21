import { createSelector } from 'reselect';

/**
 * Direct selector to the myProjects state
 */
const selectMyProjects = state => state.myProjects;

/**
 * Other specific selectors
 */

/**
 * Default selector used by MyProjects
 */
const makeSelectMyProjects = props =>
  createSelector( selectMyProjects, substate => substate );

export default makeSelectMyProjects;
export { selectMyProjects };
