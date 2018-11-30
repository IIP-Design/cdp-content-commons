import { createSelector } from 'reselect';


const createHashMap = ( array, key ) => (
  array.reduce( ( acc, obj ) => ( {
    ...acc,
    [obj[key]]: obj
  } ), {} )
);

/**
 * Direct selector to the videoItem state
 */
const selectVideoItem = ( state, props ) => {
  const { videoID, itemId } = props;
  const projects = state.videoItem;
  const { videos } = projects.find( project => project.projectId === videoID );
  const videosHashMap = createHashMap( videos, 'id' );
  return videosHashMap[itemId] || null;
};

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
