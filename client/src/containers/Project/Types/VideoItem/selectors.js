import { createSelector } from 'reselect';

/**
 * Direct selector to the videoItem state
 */
const selectVideoItem = state => state.videoItem;

/**
 * Other specific selectors
 */

/**
 * Default selector used by VideoItem
 */
const makeSelectVideoItem = props =>
  createSelector( selectVideoItem, substate => substate );

export default makeSelectVideoItem;
export { selectVideoItem };
