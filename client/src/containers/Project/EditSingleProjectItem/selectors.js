import { createSelector } from 'reselect';

/**
 * Direct selector to the editSingleProjectItem state
 */
const selectEditSingleProjectItem = state => state.editSingleProjectItem;

/**
 * Other specific selectors
 */

/**
 * Default selector used by EditSingleProjectItem
 */
const makeSelectEditSingleProjectItem = props =>
  createSelector( selectEditSingleProjectItem, substate => substate );

export default makeSelectEditSingleProjectItem;
export { selectEditSingleProjectItem };
