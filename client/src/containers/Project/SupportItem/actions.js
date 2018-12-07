/*
 *
 * SupportItem actions
 *
 */
import { createHashMap } from '../../../utils/helpers';
import {
  LOAD_SUPPORT_ITEM_PENDING,
  LOAD_SUPPORT_ITEM_FAILED,
  LOAD_SUPPORT_ITEM_SUCCESS,
  SET_UPLOAD_SUPPORT_ITEM_FAILED,
  SET_UPLOAD_SUPPORT_ITEM_SUCCESS
} from './constants';

export const loadSupportItem = ( projectId, fileType, itemId ) => async ( dispatch, getState ) => {
  const projects = getState().videoEditProject;
  const currentProject = createHashMap( projects, 'projectId' )[projectId];
  const { supportFiles } = currentProject;

  dispatch( {
    type: LOAD_SUPPORT_ITEM_PENDING,
    payload: { fileType, itemId }
  } );

  let response;
  try {
    response = await supportFiles;
  } catch ( err ) {
    return dispatch( {
      type: LOAD_SUPPORT_ITEM_FAILED,
      payload: { fileType, itemId }
    } );
  }

  return dispatch( {
    type: LOAD_SUPPORT_ITEM_SUCCESS,
    payload: { fileType, itemId, response }
  } );
};

export const setUploadStatus = ( projectId, fileType, itemId ) => async ( dispatch, getState ) => {
  const projects = getState().videoEditProject;
  const currentProject = createHashMap( projects, 'projectId' )[projectId];
  const { supportFiles } = currentProject;

  // dispatch( {
  //   type: SET_UPLOAD_VIDEO_PENDING,
  //   payload: { fileType, itemId }
  // } );

  let response;
  try {
    response = await supportFiles;
  } catch ( err ) {
    return dispatch( {
      type: SET_UPLOAD_SUPPORT_ITEM_FAILED,
      payload: { fileType, itemId }
    } );
  }

  return dispatch( {
    type: SET_UPLOAD_SUPPORT_ITEM_SUCCESS,
    payload: { fileType, itemId, response }
  } );
};

