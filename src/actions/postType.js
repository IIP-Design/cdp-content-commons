import { postTypeAggRequest, currentAggs } from '../utils/api';
import { capitalizeFirst } from '../utils/helpers';
import { LOAD_POST_TYPES_PENDING, LOAD_POST_TYPES_FAILED, LOAD_POST_TYPES_SUCCESS, POST_TYPE_CHANGE } from './types';

export const postTypeUpdate = postType => ( {
  type: POST_TYPE_CHANGE,
  payload: postType
} );

export const loadPostTypes = () => async ( dispatch, getState ) => {
  dispatch( { type: LOAD_POST_TYPES_PENDING } );

  const currentState = getState();

  let current;
  let response;

  try {
    current = await currentAggs( currentState );
    response = await postTypeAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_POST_TYPES_FAILED } );
  }

  const { buckets } = response.aggregations.postType;
  const currentTypes = current && current.postType ? current.postType.buckets : [];

  const payload = buckets.filter( type => type.key !== 'courses' && type.key !== 'page' ).map( ( type ) => {
    const postType = currentTypes.find( t => t.key === type.key );
    return {
      key: type.key,
      display_name: type.key === 'post' ? 'Article' : capitalizeFirst( type.key ),
      count: ( postType && postType.doc_count ) || 0
    };
  } );

  return dispatch( {
    type: LOAD_POST_TYPES_SUCCESS,
    payload
  } );
};
