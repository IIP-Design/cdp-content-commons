import { categoryAggRequest, categoryPrimaryRequest, categoryValueNameRequest } from '../utils/api';
import { titleCase } from '../utils/helpers';
import { LOAD_CATEGORIES_PENDING, LOAD_CATEGORIES_FAILED, LOAD_CATEGORIES_SUCCESS, CATEGORY_CHANGE } from './types';
import sortBy from 'lodash.sortby';
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
  const allIds = [...response.aggregations.all_hits.id.buckets, ...response.aggregations.all_hits.unitId.buckets];

  // get associated category name from id arr of unique values
  const categoryNameValuePairs = await categoryValueNameRequest( uniqBy( allIds, 'key' ) );

  // onlu include category if it is a primary
  const primaryCats = categoryNameValuePairs.hits.hits.filter( category =>
    primaryCategories.includes( category._source.language.en ) );

  // sort list
  const sorted = sortBy( primaryCats, [o => o._source.language.en] );

  // only display primary categories that have associated content
  const payload = sorted.map( category => ( {
    key: category._id,
    display_name: titleCase( category._source.language.en ),
    count: category.doc_count
  } ) );

  return dispatch( {
    type: LOAD_CATEGORIES_SUCCESS,
    payload
  } );
};
