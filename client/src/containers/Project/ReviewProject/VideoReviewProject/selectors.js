import { createSelector } from 'reselect';

/**
 * Direct selector to the videoReviewProject state
 */
const selectVideoReviewProject = ( state, props ) => {
  const selectProject = state.videoReviewProject.filter( project => project.project_id === props.match.params.videoID );
  return selectProject.length > 0 ? selectProject[0] : null;
};

/**
 * Other specific selectors
 */
const selectDisableRightClick = ( state, props ) => {
  const selectProject = state.videoReviewProject.filter( project => project.project_id === props.match.params.videoID );
  return selectProject.length > 0 ? selectProject[0].disable_right_click : null;
};

/**
 * Default selector used by VideoReviewProject
 */
const makeSelectVideoReviewProject = props => createSelector( selectVideoReviewProject, substate => substate );

export default makeSelectVideoReviewProject;
export { selectVideoReviewProject, selectDisableRightClick };
