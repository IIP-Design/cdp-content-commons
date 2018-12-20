/*
 *
 * VideoEditProject reducer
 *
 */
import {
  LOAD_VIDEO_PROJECT_PENDING,
  LOAD_VIDEO_PROJECT_FAILED,
  LOAD_VIDEO_PROJECT_SUCCESS,
  DELETE_VIDEO_PROJECT_SUCCESS,
  SAVE_VIDEO_PROJECT_DATA_FAILED,
  SAVE_VIDEO_PROJECT_DATA_SUCCESS
} from './constants';
import { createHashMap } from '../../../../utils/helpers';
import { projects } from '../../mockData';


export const INITIAL_STATE = createHashMap( projects, 'projectId' );

const setLoading = ( state, action ) => {
  const { projectId } = action.payload;
  return {
    ...state,
    [projectId]: {
      ...state[projectId],
      loading: true,
      error: false
    }
  };
};

const setError = ( state, action ) => {
  const { projectId } = action.payload;
  return {
    ...state,
    [projectId]: {
      ...state[projectId],
      loading: false,
      error: true
    }
  };
};

const setSuccess = ( state, action ) => {
  const { response, projectId } = action.payload;
  const project = response[projectId];
  return {
    ...state,
    [projectId]: {
      ...project,
      loading: false,
      error: false
    }
  };
};

const setSaveError = ( state, action ) => {
  const { projectId } = action.payload;
  return {
    ...state,
    [projectId]: {
      ...state[projectId],
      saveStatus: {
        error: true,
        success: false
      }
    }
  };
};

const setSaveSuccess = ( state, action ) => {
  const { projectId, response } = action.payload;
  const updated = new Date();
  return {
    ...state,
    [projectId]: {
      ...state[projectId],
      updated: updated.toISOString(),
      projectData: {
        ...response
      },
      saveStatus: {
        error: false,
        success: true
      }
    }
  };
};

const setDeleteSuccess = ( state, action ) => {
  const { projectId } = action.payload;
  const newState = { ...state };
  delete newState[projectId];
  return newState;
};

function videoEditProjectReducer( state = INITIAL_STATE, action ) {
  switch ( action.type ) {
    case LOAD_VIDEO_PROJECT_PENDING:
      return setLoading( state, action );

    case LOAD_VIDEO_PROJECT_FAILED:
      return setError( state, action );

    case LOAD_VIDEO_PROJECT_SUCCESS:
      return setSuccess( state, action );

    case SAVE_VIDEO_PROJECT_DATA_FAILED:
      return setSaveError( state, action );

    case SAVE_VIDEO_PROJECT_DATA_SUCCESS:
      return setSaveSuccess( state, action );

    case DELETE_VIDEO_PROJECT_SUCCESS:
      return setDeleteSuccess( state, action );

    default:
      return state;
  }
}

export default videoEditProjectReducer;
