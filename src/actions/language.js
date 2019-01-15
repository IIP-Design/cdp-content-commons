import { languageAggRequest, languagesRequest } from '../utils/api';
import { LOAD_LANGUAGES_PENDING, LOAD_LANGUAGES_FAILED, LOAD_LANGUAGES_SUCCESS, LANGUAGE_CHANGE } from './types';
import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';

export const languageUpdate = language => ( {
  type: LANGUAGE_CHANGE,
  payload: language
} );

export const loadLanguages = () => async ( dispatch, getState ) => {
  dispatch( { type: LOAD_LANGUAGES_PENDING } );

  let languages = [];
  let response;
  let all;

  const currentState = getState();

  // Fetch languages that have content AND all languages in language index
  try {
    response = await languageAggRequest( currentState );
    all = await languagesRequest();
  } catch ( err ) {
    return dispatch( { type: LOAD_LANGUAGES_FAILED } );
  }

  try {
    languages = all.hits.hits.map( language => language._source );
  } catch ( err ) {
    console.log( 'There are no languages avaialble' );
  }

  // Get all languages that have associated content across content types
  const { aggregations } = response;
  const allLocales = [
    ...aggregations.all_hits.locale.buckets,
    ...aggregations.all_hits.unitLocale.buckets
  ].map( locale => ( {
    key: locale.key.toLowerCase(),
    count: locale.doc_count
  } ) );

  // Return onlu unique, valid language locales
  const uniqueLocales = uniqBy( allLocales, 'key' ).filter( locale => languages.find( l => l.locale === locale.key ) );

  // Get associated language name from locale
  const payload = languages.map( ( locale ) => {
    const language = uniqueLocales.find( l => l.key === locale.locale );
    if ( language ) {
      return {
        key: language.key,
        display_name: locale.display_name,
        count: language.count
      };
    }
    return {
      key: locale.locale,
      display_name: locale.display_name,
      count: 0
    };
  } );

  return dispatch( {
    type: LOAD_LANGUAGES_SUCCESS,
    payload: sortBy( payload, ['display_name'] )
  } );
};
