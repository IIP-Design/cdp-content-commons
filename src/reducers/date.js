import {
  DATE_CHANGE,
  TO_DATE_CHANGE,
  FROM_DATE_CHANGE,
  SEARCH_FILTER_SELECTIONS_CLEAR
} from '../actions/types';
import { localStorageInitFilterState } from '../utils/localStorage';

const INITIAL_STATE = {
  from: new Date(),
  to: new Date(),
  list: [
    { key: 'recent', display: 'Most Recent' },
    // {
    //   key: 'now-1h',
    //   display: 'Past Hour'
    // },
    {
      key: 'now-1d',
      display: 'Past 24 Hours'
    },
    {
      key: 'now-1w',
      display: 'Past Week'
    },
    {
      key: 'now-1M',
      display: 'Past Month'
    },
    {
      key: 'now-1y',
      display: 'Past Year'
    }
    // { key: 'oldest', display: 'Oldest' },
    // { key: 'custom', display: 'Custom' }
  ],
  currentDate: localStorageInitFilterState( 'date' ) !== null
    ? localStorageInitFilterState( 'date' )[0]
    : { key: 'recent', display: 'Most Recent' }
};

export default ( state = INITIAL_STATE, action ) => {
  switch ( action.type ) {
    case DATE_CHANGE:
      return {
        ...state,
        currentDate: action.payload ? action.payload : { key: 'recent', display: 'Most Recent' }
      };
    case FROM_DATE_CHANGE:
      return {
        ...state,
        from: action.payload
      };
    case TO_DATE_CHANGE:
      return {
        ...state,
        to: action.payload
      };
    case SEARCH_FILTER_SELECTIONS_CLEAR:
      return {
        ...state,
        currentDate: { key: 'recent', display: 'Most Recent' }
      };
    default:
      return state;
  }
};
