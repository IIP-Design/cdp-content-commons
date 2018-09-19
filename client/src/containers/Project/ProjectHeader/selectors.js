import { createSelector } from 'reselect';

/**
 * Direct selector to the projectHeader state
 */
const selectProjectHeader = state => state.projectHeader;

/**
 * Other specific selectors
 */

/**
 * Default selector used by ProjectHeader
 */
const makeSelectProjectHeader = props =>
  createSelector( selectProjectHeader, substate => substate );

export default makeSelectProjectHeader;
export { selectProjectHeader };
