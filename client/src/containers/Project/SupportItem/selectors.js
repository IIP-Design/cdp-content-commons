import { createSelector } from 'reselect';
import { createHashMap } from '../../../utils/helpers';

/**
 * Direct selector to the supportItem state
 */
const selectSupportItem = ( state, props ) => {
  const { projectId, fileType, itemId } = props;
  const { videoID } = projectId;

  const projects = state.supportItem;
  const { supportFiles } = projects.find( project => project.projectId === videoID );
  const filesHashMap = createHashMap( supportFiles[fileType], 'id' );
  return filesHashMap[itemId] || null;
};

/**
 * Other specific selectors
 */

/**
 * Default selector used by SupportItem
 */
const makeSelectSupportItem = props =>
  createSelector( selectSupportItem, substate => substate );

export default makeSelectSupportItem;
export { selectSupportItem };
