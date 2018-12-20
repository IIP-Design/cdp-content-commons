/*
 *
 * VideoEditProject actions
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


export const loadVideoProjects = projectId => async ( dispatch, getState ) => {
  dispatch( {
    type: LOAD_VIDEO_PROJECT_PENDING,
    payload: { projectId }
  } );

  let response;
  try {
    response = await getState().projects;
  } catch ( err ) {
    return dispatch( {
      type: LOAD_VIDEO_PROJECT_FAILED,
      payload: { projectId }
    } );
  }

  return dispatch( {
    type: LOAD_VIDEO_PROJECT_SUCCESS,
    payload: { projectId, response }
  } );
};

export const saveProjectData = ( projectId, formData ) => async ( dispatch ) => {
  // dispatch( {
  //   type: SAVE_VIDEO_PROJECT_DATA_PENDING,
  //   payload: { projectId }
  // } );
  let response;
  try {
    response = await formData;
  } catch ( err ) {
    return dispatch( {
      type: SAVE_VIDEO_PROJECT_DATA_FAILED,
      payload: { projectId }
    } );
  }

  return dispatch( {
    type: SAVE_VIDEO_PROJECT_DATA_SUCCESS,
    payload: { projectId, response }
  } );
};

export const deleteVideoProject = projectId => dispatch => (
  dispatch( {
    type: DELETE_VIDEO_PROJECT_SUCCESS,
    payload: { projectId }
  } )
);
