import { createSelector } from 'reselect';

/**
 * Direct selector to the reviewSubmit state
 */
const selectReviewSubmit = state => state.reviewSubmit;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ReviewSubmit
 */
const makeSelectReviewSubmit = props =>
  createSelector( selectReviewSubmit, substate => substate );

export default makeSelectReviewSubmit;
export { selectReviewSubmit };
