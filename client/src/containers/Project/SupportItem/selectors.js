import { createSelector } from 'reselect';

/**
 * Direct selectors
 */
const selectSupportItem = ( state, props ) => {
  if ( state.projectSupportItems[props.fileType] ) {
    return state.projectSupportItems[props.fileType][props.itemId];
  }
};

/**
 * Selector factories: returns selector instances
 */
const makeSelectSupportItem = () =>
  createSelector( selectSupportItem, supportItem => supportItem );

export { makeSelectSupportItem };
