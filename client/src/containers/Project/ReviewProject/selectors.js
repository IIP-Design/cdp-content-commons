import { createSelector } from 'reselect';

/**
 * Direct selector to the reviewProject state
 */
const selectReviewProject = state => state.reviewProject;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReviewProject
 */
const makeSelectReviewProject = props =>
  createSelector( selectReviewProject, substate => substate );

export default makeSelectReviewProject;
export { selectReviewProject };
