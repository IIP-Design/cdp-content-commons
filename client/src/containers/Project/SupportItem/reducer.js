/*
 *
 * SupportItem reducer
 *
 */

import {
  LOAD_SUPPORT_ITEM_PENDING,
  LOAD_SUPPORT_ITEM_FAILED,
  LOAD_SUPPORT_ITEM_SUCCESS,
  SET_UPLOAD_SUPPORT_ITEM_FAILED,
  SET_UPLOAD_SUPPORT_ITEM_SUCCESS
} from './constants';
import { createHashMap } from '../../../utils/helpers';

export const INITIAL_STATE = {};

const setLoading = ( state, action ) => {
  const { fileType, itemId } = action.payload;
  return {
    ...state,
    [fileType]: {
      ...state[fileType],
      [itemId]: {
        loading: true,
        error: false
      }
    }
  };
};

const setError = ( state, action ) => {
  const { fileType, itemId } = action.payload;
  return {
    ...state,
    [fileType]: {
      ...state[fileType],
      [itemId]: {
        loading: false,
        error: true
      }
    }
  };
};

const setSuccess = ( state, action ) => {
  const { fileType, itemId, response } = action.payload;
  const supportItems = createHashMap( response[fileType], 'id' );
  return {
    ...state,
    [fileType]: {
      ...state[fileType],
      [itemId]: {
        ...supportItems[itemId],
        loading: false,
        error: false
      }
    }
  };
};

const setUploadError = ( state, action ) => {
  const { fileType, itemId } = action.payload;
  return {
    ...state,
    [fileType]: {
      ...state[fileType],
      [itemId]: {
        loading: false,
        error: false,
        uploadStatus: {
          error: true,
          success: false
        }
      }
    }
  };
};

const setUploadSuccess = ( state, action ) => {
  const { fileType, itemId, response } = action.payload;
  const supportItems = createHashMap( response[fileType], 'id' );
  return {
    ...state,
    [fileType]: {
      ...state[fileType],
      [itemId]: {
        ...supportItems[itemId],
        loading: false,
        error: false,
        uploadStatus: {
          error: false,
          success: true
        }
      }
    }
  };
};

function supportItemReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case LOAD_SUPPORT_ITEM_PENDING:
      return setLoading( state, action );

    case LOAD_SUPPORT_ITEM_FAILED:
      return setError( state, action );

    case LOAD_SUPPORT_ITEM_SUCCESS:
      return setSuccess( state, action );

    case SET_UPLOAD_SUPPORT_ITEM_FAILED:
      return setUploadError( state, action );

    case SET_UPLOAD_SUPPORT_ITEM_SUCCESS:
      return setUploadSuccess( state, action );

    default:
      return state;
  }
}

export default supportItemReducer;
