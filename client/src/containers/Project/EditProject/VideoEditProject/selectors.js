import { createSelector } from 'reselect';

/**
 * Direct selectors
 */
const selectCurrentVideoEditProject = ( state, props ) =>
  state.projects[props.match.params.videoID];

const selectUploadedVideoProjectItemsCount = ( state ) => {
  const videos = state.videoProjectItems;
  const videoIds = Object.keys( videos );
  const uploadedVideos = videoIds.filter( id => !videos[id].loading && videos[id].uploadStatus.success );
  return uploadedVideos.length;
};

const selectUploadedSupportFilesCount = ( state ) => {
  const supportItems = state.projectSupportItems;
  const fileTypes = Object.values( supportItems );

  const countsPerFiletype = fileTypes.map( ( items ) => {
    const ids = Object.keys( items );
    return ids.filter( id => !items[id].loading && items[id].uploadStatus.success ).length;
  } );

  return countsPerFiletype.reduce( ( acc, curr ) => acc + curr, 0 );
};

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
