import { createSelector } from 'reselect';

/**
 * Direct selector to the videoReviewProject state
 */
const selectVideoReviewProject = ( state, props ) => {
  return state.videoReviewProject.filter( project => project.project_id === props.match.params.videoID )[0];  
};

/**
 * Other specific selectors
 */
const selectDisableRightClick = ( state, props ) => {
  const selectProject = state.videoReviewProject.filter( project => project.project_id === props.match.params.videoID )[0];
  return selectProject.disable_right_click;
};

/**
 * Default selector used by VideoReviewProject
 */
const makeSelectVideoReviewProject = props => createSelector( selectVideoReviewProject, substate => substate );

export default makeSelectVideoReviewProject;
export { selectVideoReviewProject, selectDisableRightClick };
