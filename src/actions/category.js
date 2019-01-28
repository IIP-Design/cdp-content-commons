import { categoryAggRequest, categoryPrimaryRequest, categoryValueNameRequest } from '../utils/api';
import { titleCase } from '../utils/helpers';
import { LOAD_CATEGORIES_PENDING, LOAD_CATEGORIES_FAILED, LOAD_CATEGORIES_SUCCESS, CATEGORY_CHANGE } from './types';
import orderBy from 'lodash.orderby';
import uniqBy from 'lodash.uniqby';

export const categoryUpdate = ( category, checked ) => ( {
  type: CATEGORY_CHANGE,
  payload: category
} );

export const loadCategories = () => async ( dispatch, getState ) => {
  dispatch( { type: LOAD_CATEGORIES_PENDING } );

  let response;
  let primary;

  const currentState = getState();

  try {
    response = await categoryAggRequest( currentState );
    primary = await categoryPrimaryRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_CATEGORIES_FAILED } );
  }

  // get primary categories
  const primaryCategories = primary.hits.hits.map( category => category._source.language.en );

  // get all category ids that have associated content
  const allIds = [...response.aggregations.id.buckets, ...response.aggregations.unitId.buckets];

  // get associated category name from id arr of unique values
  const categoryNameValuePairs = await categoryValueNameRequest( uniqBy( allIds, 'key' ) );

  // only include category if it is a primary
  const primaryCats = categoryNameValuePairs.hits.hits.filter( category =>
    primaryCategories.includes( category._source.language.en ) );

  // merge category names with count
  const merged = primaryCats.map( cat => ( {
    key: cat._id,
    display_name: titleCase( cat._source.language.en ),
    count: allIds.find( k => k.key === cat._id ).doc_count
  } ) );

  // sort list by count
  const sorted = orderBy( merged, 'count', 'desc' );

  return dispatch( {
    type: LOAD_CATEGORIES_SUCCESS,
    payload: sorted
  } );
};
