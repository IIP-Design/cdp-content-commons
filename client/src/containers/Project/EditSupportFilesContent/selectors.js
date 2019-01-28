import { createSelector } from 'reselect';

/**
 * Direct selector to the editSupportFilesContent state
 */
const selectEditSupportFilesContent = state => state.editSupportFilesContent;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditSupportFilesContent
 */
const makeSelectEditSupportFilesContent = props =>
  createSelector( selectEditSupportFilesContent, substate => substate );

export default makeSelectEditSupportFilesContent;
export { selectEditSupportFilesContent };
