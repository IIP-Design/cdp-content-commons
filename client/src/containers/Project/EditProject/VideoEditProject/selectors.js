import { createSelector } from 'reselect';

/**
 * Direct selectors
 */
const selectCurrentVideoEditProject = ( state, props ) =>
  state.projects[props.match.params.videoID];

const selectUploadedVideoProjectItemsCount = state => (
  Object.values( state.videoProjectItems )
    .filter( video => !video.loading && video.uploadStatus.success ).length
);

const selectUploadedSupportFilesCount = state => (
  Object.values( state.projectSupportItems )
    .map( items => Object.values( items )
      .filter( item => !item.loading && item.uploadStatus.success )
      .length )
    .reduce( ( acc, curr ) => acc + curr, 0 )
);

/**
 * Selector factories: returns selector instances
 */
const makeSelectCurrentVideoEditProject = () =>
  createSelector( selectCurrentVideoEditProject, project => project );

const makeUploadedVideoProjectItemsCount = () =>
  createSelector( selectUploadedVideoProjectItemsCount, count => count );

const makeUploadedSupportFilesCount = () =>
  createSelector( selectUploadedSupportFilesCount, count => count );

export {
  makeSelectCurrentVideoEditProject,
  makeUploadedVideoProjectItemsCount,
  makeUploadedSupportFilesCount
};
