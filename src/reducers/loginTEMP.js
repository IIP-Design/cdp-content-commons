import { LOGGED_IN, LOGGED_OUT } from '../actions/types';

export default ( state = false, action ) => {
  switch ( action.type ) {
    case LOGGED_IN:
      return action.value;

    case LOGGED_OUT:
      return action.value;

    default:
      return state;
  }
};

