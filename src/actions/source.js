import { sourceAggRequest } from '../utils/api';
import {
  LOAD_SOURCES_PENDING,
  LOAD_SOURCES_FAILED,
  LOAD_SOURCES_SUCCESS,
  SOURCE_CHANGE
} from './types';

/**
 * Owners name for the young leader sites are not completely standardized
 * so we standardize and send an array to enable search on all variants
 */
const MAPPINGS = [
  {
    key: ['Young African Leaders Initiative', 'Young African Leaders Initiative Network'],
    display: 'YALI'
  },
  {
    key: ['Young Leaders of the Americas Initiative', 'Young Leaders of the Americas Initiative Network'],
    display: 'YLAI'
  }
];

/**
 * Remove duplicates that appear due to young leader sites having inconsistent owner names
 * @param {array} sources site owners
 */
const normalize = sources =>
  sources.filter( ( source ) => {
    const isYl =
      source.key.includes( 'Young African Leaders Initiative' ) ||
      source.key.includes( 'Young Leaders of the Americas Initiative' );

    if ( !isYl ) return true;

    return !source.key.includes( 'Network' );
  } );

/**
 * Fetch abbreviated name for young leader sites
 * @param {array} key owner key returned from ES index
 */
const normalizeDisplay = ( key ) => {
  const source = MAPPINGS.find( mapping => mapping.key.includes( key ) );
  return source ? source.display : key;
};

/**
 * Stringifys array of young leader keys if needed
 * @param {*} key owner key returned from ES index
 */
const normalizeKeys = ( key ) => {
  const source = MAPPINGS.find( mapping => mapping.key.includes( key ) );
  return source ? source.key.join() : key;
};

/**
 * Return array of young leader owner keys if needed
 * If not, make the key an array so processing is consistent
 * @param {*} source payload from source action creator
 */
export const sourceUpdate = ( source ) => {
  if ( !source ) {
    return {
      type: SOURCE_CHANGE,
      payload: source
    };
  }
  const item = MAPPINGS.find( mapping => mapping.display.includes( source.display_name ) );
  const key = item ? item.key : [source.key];
  return {
    type: SOURCE_CHANGE,
    payload: { ...source, key }
  };
};

export const loadSources = () => async ( dispatch ) => {
  dispatch( { type: LOAD_SOURCES_PENDING } );

  let response;
  try {
    response = await sourceAggRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_SOURCES_FAILED } );
  }

  const sources = response.aggregations.source.buckets;
  const normalized = normalize( sources );

  const payload = normalized.filter( bucket => bucket.key && bucket.key !== 'IIP Courses' ).map( bucket => ( {
    key: normalizeKeys( bucket.key ),
    display: normalizeDisplay( bucket.key ),
    count: bucket.doc_count
  } ) );

  return dispatch( {
    type: LOAD_SOURCES_SUCCESS,
    payload
  } );
};
