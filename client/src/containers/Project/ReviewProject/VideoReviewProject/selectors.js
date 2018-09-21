import { createSelector } from 'reselect';

/**
 * Direct selector to the videoReviewProject state
 */
const selectVideoReviewProject = state => state.videoReviewProject;

/**
 * Other specific selectors
 */
 const selectDisableRightClick = state => state.videoReviewProject.disable_right_click;

/**
 * Default selector used by VideoReviewProject
 */
const makeSelectVideoReviewProject = props => createSelector( selectVideoReviewProject, substate => substate );

export default makeSelectVideoReviewProject;
export { selectVideoReviewProject, selectDisableRightClick };
