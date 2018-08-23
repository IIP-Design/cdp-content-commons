import { combineReducers } from 'redux';

import searchReducer from './search';
import languagesReducer from './languages';
import categoriesReducer from './categories';
import postTypeReducer from './postTypes';
import dateReducer from './date';
import sourceReducer from './sources';
import loginReducer from './loginTEMP';

export default combineReducers( {
  search: searchReducer,
  language: languagesReducer,
  category: categoriesReducer,
  type: postTypeReducer,
  date: dateReducer,
  source: sourceReducer,
  loggedIn: loginReducer
} );
