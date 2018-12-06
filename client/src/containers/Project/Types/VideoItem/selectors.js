import { createSelector } from 'reselect';

/**
 * Direct selectors
 */
const selectVideoItem = ( state, props ) => state.videoProjectItems[props.itemId];

/**
 * Selector factories: returns selector instances
 */
const makeSelectVideoItem = () =>
  createSelector( selectVideoItem, video => video );

export default makeSelectVideoItem;
