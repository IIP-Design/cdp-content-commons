/*
 *
 * VideoItem actions
 *
 */
import {
  LOAD_VIDEO_ITEM_PENDING,
  LOAD_VIDEO_ITEM_FAILED,
  LOAD_VIDEO_ITEM_SUCCESS,
  SET_UPLOAD_VIDEO_FAILED,
  SET_UPLOAD_VIDEO_SUCCESS
} from './constants';
import { createHashMap } from '../../../../utils/helpers';


export const loadVideoItem = ( projectId, itemId ) => async ( dispatch, getState ) => {
  const { projects } = getState();
  const currentProject = projects[projectId];
  const videosMap = createHashMap( currentProject.videos, 'id' );

  dispatch( {
    type: LOAD_VIDEO_ITEM_PENDING,
    payload: { itemId }
  } );

  let response;
  try {
    response = await videosMap;
  } catch ( err ) {
    return dispatch( {
      type: LOAD_VIDEO_ITEM_FAILED,
      payload: { itemId }
    } );
  }

  return dispatch( {
    type: LOAD_VIDEO_ITEM_SUCCESS,
    payload: { itemId, response }
  } );
};

export const setUploadStatus = ( projectId, itemId ) => async ( dispatch, getState ) => {
  const { projects } = getState();
  const currentProject = projects[projectId];
  const videos = createHashMap( currentProject.videos, 'id' );

  // dispatch( {
  //   type: SET_UPLOAD_VIDEO_PENDING,
  //   payload: { itemId }
  // } );

  let response;
  try {
    response = await videos;
  } catch ( err ) {
    return dispatch( {
      type: SET_UPLOAD_VIDEO_FAILED,
      payload: { itemId }
    } );
  }

  return dispatch( {
    type: SET_UPLOAD_VIDEO_SUCCESS,
    payload: { itemId, response }
  } );
};
