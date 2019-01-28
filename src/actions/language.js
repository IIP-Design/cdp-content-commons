import { languageAggRequest, languagesRequest } from '../utils/api';
import { LOAD_LANGUAGES_PENDING, LOAD_LANGUAGES_FAILED, LOAD_LANGUAGES_SUCCESS, LANGUAGE_CHANGE } from './types';
import uniqBy from 'lodash.uniqby';
import sortBy from 'lodash.sortby';

export const languageUpdate = language => ( {
  type: LANGUAGE_CHANGE,
  payload: language
} );

export const loadLanguages = () => async ( dispatch ) => {
  dispatch( { type: LOAD_LANGUAGES_PENDING } );

  let languages = [];
  let response;
  let all;

  // Fetch languages that have content AND all languages in language index
  try {
    response = await languageAggRequest();
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
  const allLocales = [...aggregations.locale.buckets, ...aggregations.unitLocale.buckets].map( locale => ( {
    key: locale.key.toLowerCase(),
    count: locale.doc_count
  } ) );

  // Return onlu unique, valid language locales
  const uniqueLocales = uniqBy( allLocales, 'key' ).filter( locale => languages.find( l => l.locale === locale.key ) );

  // Get associated language name from locale
  const payload = uniqueLocales.map( ( locale ) => {
    const language = languages.find( l => l.locale === locale.key );
    return {
      key: language.locale,
      display_name: language.display_name,
      count: locale.count
    };
  } );

  return dispatch( {
    type: LOAD_LANGUAGES_SUCCESS,
    payload: sortBy( payload, ['display_name'] )
  } );
};
