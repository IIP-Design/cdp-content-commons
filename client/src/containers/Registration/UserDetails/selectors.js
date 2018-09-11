import { createSelector } from 'reselect';

/**
 * Direct selector to the userDetails state
 */
const selectUserDetails = state => state.userDetails;

/**
 * Other specific selectors
 */
const selectFirstName = state => state.userDetails.firstName;
const selectLastName = state => state.userDetails.lastName;
const selectEmail = state => state.userDetails.email;
const selectJobTitle = state => state.userDetails.jobTitle;
const selectCountry = state => state.userDetails.country;
const selectCity = state => state.userDetails.city;
const selectReference = state => state.userDetails.reference;

/**
 * Default selector used by UserDetails
 */
const makeSelectUserDetails = props =>
  createSelector( selectUserDetails, substate => substate );

export default makeSelectUserDetails;
export {
  selectFirstName,
  selectLastName,
  selectEmail,
  selectJobTitle,
  selectCountry,
  selectCity,
  selectReference
};
