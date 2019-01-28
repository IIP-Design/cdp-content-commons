import { createSelector } from 'reselect';

/**
 * Direct selector to the editSupportFileRow state
 */
const selectEditSupportFileRow = state => state.editSupportFileRow;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditSupportFileRow
 */
const makeSelectEditSupportFileRow = props =>
  createSelector( selectEditSupportFileRow, substate => substate );

export default makeSelectEditSupportFileRow;
export { selectEditSupportFileRow };
