import { postTypeAggRequest } from '../utils/api';
import { capitalizeFirst } from '../utils/helpers';
import {
  LOAD_POST_TYPES_PENDING,
  LOAD_POST_TYPES_FAILED,
  LOAD_POST_TYPES_SUCCESS,
  POST_TYPE_CHANGE
} from './types';

export const postTypeUpdate = postType => ( {
  type: POST_TYPE_CHANGE,
  payload: postType
} );

export const loadPostTypes = () => async ( dispatch ) => {
  dispatch( { type: LOAD_POST_TYPES_PENDING } );

  let response;
  try {
    response = await postTypeAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_POST_TYPES_FAILED } );
  }

  const { buckets } = response.aggregations.postType;
  const payload = buckets.filter( type => type.key !== 'courses' && type.key !== 'page' ).map( type => ( {
    key: type.key,
    display: type.key === 'post' ? 'Article' : capitalizeFirst( type.key ),
    count: type.doc_count
  } ) );

  return dispatch( {
    type: LOAD_POST_TYPES_SUCCESS,
    payload
  } );
};
