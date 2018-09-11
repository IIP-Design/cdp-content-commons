import { combineReducers } from 'redux';

// global reducers
import globalReducer from 'containers/App/reducers/';
import authReducer from 'containers/Auth/reducer';

// frontend reducers
// import searchReducer from './search';
import recentsReducer from 'containers/Recents/reducer';
import selectRoleReducer from 'containers/Registration/SelectRole/reducer';
import teamDetailsReducer from 'containers/Registration/TeamDetails/reducer';
import userDetailsReducer from 'containers/Registration/UserDetails/reducer';

// admin reducers

export default combineReducers( {
  // search: searchReducer,
  global: globalReducer,
  auth: authReducer,
  recents: recentsReducer,
  selectRole: selectRoleReducer,
  teamDetails: teamDetailsReducer,
  userDetails: userDetailsReducer
} );
