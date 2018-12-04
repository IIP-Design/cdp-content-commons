import { combineReducers } from 'redux';

// global reducers
import globalReducer from 'containers/App/reducers/';
import authReducer from 'containers/Auth/reducer';

// frontend reducers
// import searchReducer from './search';
import recentsReducer from 'containers/Recents/reducer';

// admin reducers
import supportItemReducer from 'containers/Project/SupportItem/reducer';
import videoItemReducer from 'containers/Project/Types/VideoItem/reducer';
import videoEditProjectReducer from 'containers/Project/EditProject/VideoEditProject/reducer';
import videoReviewProjectReducer from 'containers/Project/ReviewProject/VideoReviewProject/reducer';

export default combineReducers( {
  // search: searchReducer,
  global: globalReducer,
  auth: authReducer,
  recents: recentsReducer,
  supportItem: supportItemReducer,
  videoItem: videoItemReducer,
  videoEditProject: videoEditProjectReducer,
  videoReviewProject: videoReviewProjectReducer
} );
