import { combineReducers } from 'redux';

// global reducers
import globalReducer from 'containers/App/reducers/';
import authReducer from 'containers/Auth/reducer';

// frontend reducers
// import searchReducer from './search';
import recentsReducer from 'containers/Recents/reducer';

// admin reducers
import videoEditProjectReducer from 'containers/Project/EditProject/VideoEditProject/reducer';
import videoReviewProjectReducer from 'containers/Project/ReviewProject/VideoReviewProject/reducer';

export default combineReducers( {
  // search: searchReducer,
  global: globalReducer,
  auth: authReducer,
  recents: recentsReducer,
  videoEditProject: videoEditProjectReducer,
  videoReviewProject: videoReviewProjectReducer
} );
