/*
 *
 * VideoItem reducer
 *
 */

import {
  LOAD_VIDEO_ITEM_PENDING,
  LOAD_VIDEO_ITEM_FAILED,
  LOAD_VIDEO_ITEM_SUCCESS,
  SET_UPLOAD_VIDEO_FAILED,
  SET_UPLOAD_VIDEO_SUCCESS
} from './constants';

export const INITIAL_STATE = {};

const setLoading = ( state, action ) => {
  const { itemId } = action.payload;
  return {
    ...state,
    [itemId]: {
      ...state[itemId],
      loading: true,
      error: false
    }
  };
};

const setError = ( state, action ) => {
  const { itemId } = action.payload;
  return {
    ...state,
    [itemId]: {
      ...state[itemId],
      loading: false,
      error: true
    }
  };
};

const setSuccess = ( state, action ) => {
  const { response, itemId } = action.payload;
  const videoItem = response[itemId];
  return {
    ...state,
    [itemId]: {
      ...videoItem,
      loading: false,
      error: false
    }
  };
};

const setUploadError = ( state, action ) => {
  const { itemId } = action.payload;
  return {
    ...state,
    [itemId]: {
      ...state[itemId],
      uploadStatus: {
        error: true,
        success: false
      }
    }
  };
};

const setUploadSuccess = ( state, action ) => {
  const { itemId } = action.payload;
  return {
    ...state,
    [itemId]: {
      ...state[itemId],
      uploadStatus: {
        error: false,
        success: true
      }
    }
  };
};

function videoItemReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case LOAD_VIDEO_ITEM_PENDING:
      return setLoading( state, action );

    case LOAD_VIDEO_ITEM_FAILED:
      return setError( state, action );

    case LOAD_VIDEO_ITEM_SUCCESS:
      return setSuccess( state, action );

    case SET_UPLOAD_VIDEO_FAILED:
      return setUploadError( state, action );

    case SET_UPLOAD_VIDEO_SUCCESS:
      return setUploadSuccess( state, action );

    default:
      return state;
  }
}

export default videoItemReducer;
