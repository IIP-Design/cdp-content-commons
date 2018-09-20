import { createSelector } from 'reselect';

/**
 * Direct selector to the videoReviewProject state
 */
const selectVideoReviewProject = state => state.videoReviewProject;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoReviewProject
 */
const makeSelectVideoReviewProject = props =>
  createSelector( selectVideoReviewProject, substate => substate );

export default makeSelectVideoReviewProject;
export { selectVideoReviewProject };
