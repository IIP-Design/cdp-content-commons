import { createSelector } from 'reselect';

/**
 * Direct selector to the videoEditVideo state
 */
const selectVideoEditVideo = state => state.videoEditVideo;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoEditVideo
 */
const makeSelectVideoEditVideo = props =>
  createSelector( selectVideoEditVideo, substate => substate );

export default makeSelectVideoEditVideo;
export { selectVideoEditVideo };
