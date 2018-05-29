import { sourceAggRequest } from '../utils/api';
import {
  LOAD_SOURCES_PENDING,
  LOAD_SOURCES_FAILED,
  LOAD_SOURCES_SUCCESS,
  SOURCE_CHANGE
} from './types';

export const sourceUpdate = source => ( {
  type: SOURCE_CHANGE,
  payload: source
} );

export const loadSources = () => async ( dispatch ) => {
  dispatch( { type: LOAD_SOURCES_PENDING } );

  let response;
  try {
    response = await sourceAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_SOURCES_FAILED } );
  }

  const sources = response.aggregations.source.buckets;

  const payload = sources.filter( bucket => bucket.key && bucket.key !== 'IIP Courses' ).map( bucket => ( {
    key: bucket.key,
    display: bucket.key,
    count: bucket.doc_count
  } ) );

  return dispatch( {
    type: LOAD_SOURCES_SUCCESS,
    payload
  } );
};
