import { createSelector } from 'reselect';

/**
 * Direct selector to the VideoEditProject state
 */
const selectVideoEditProject = ( state, props ) => {
  const { videoID } = props.match.params;
  const projects = state.videoEditProject;
  const selectedProject = projects.find( project => project.projectId === videoID );
  return selectedProject || null;
};

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
