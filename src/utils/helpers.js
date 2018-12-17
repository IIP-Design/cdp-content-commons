import Bodybuilder from 'bodybuilder';

// TODO: Create type objects where all type related tasks, vars are held
// i.e. fields to search, parser, etc.
const fields = {
  post: [
    'title^2', 'author', 'content', 'excerpt', 'categories', 'tags'
  ],
  video: [
    'author', 'unit.title^6', 'unit.desc^3', 'unit.transcript.text', 'unit.categories.name', 'unit.tags'
  ]
};

export const millisToSeconds = ( millis ) => {
  if ( typeof millis !== 'number' ) {
    throw new Error( '_millisToSeconds(): Provided parameter is not a number' );
  }
  return ( ( millis % 60000 ) / 1000 ).toFixed( 2 );
};

export const numberWithCommas = ( number ) => {
  if ( typeof number !== 'number' ) {
    throw new Error( 'Error: Parameter provided is not a number' );
  }
  return number.toString().replace( /\B(?=(\d{3})+(?!\d))/g, ',' );
};

/**
 * Escape the id if the first letter is a reserved character
 * @param {string } id ES _id
 */
export const escape = ( id ) => {
  const re = /[+\-=!(){}[\]"~*?:\\^/]/;
  return re.test( id.charAt( 0 ) ) ? `\\${id}` : id;
};

export const capitalizeFirst = str => str.substr( 0, 1 ).toUpperCase() + str.substr( 1 );
export const titleCase = str =>
  str
    .toLowerCase()
    .split( ' ' )
    .map( word => word.charAt( 0 ).toUpperCase() + word.slice( 1 ) )
    .join( ' ' );

export const getAvailableLanguages = ( item ) => {
  if ( !item || !item.type ) return [];
  switch ( item.type ) {
    case 'video': {
      const langArr = item.units.reduce( ( langs, unit ) => {
        if ( unit.source && unit.source.length ) {
          langs.push( {
            key: unit.language.locale,
            value: unit.language.display_name,
            text: unit.language.display_name
          } );
        }
        return langs;
      }, [] );
      return langArr;
    }
    case 'post':
      if ( item.languages ) {
        let langArray = [];
        langArray = item.languages.map( post => ( {
          id: post.post_id,
          key: post.language.locale,
          value: post.language.display_name,
          text: post.language.display_name
        } ) );
        langArray.unshift( {
          id: item.id,
          key: item.language.locale,
          value: item.language.display_name,
          text: item.language.display_name
        } );
        return langArray;
      }
      return {
        id: item.post_id,
        key: 'en-us',
        value: 'English',
        text: 'English'
      };
    default:
      return [];
  }
};

// Following rules normalize language, categories, tags, etc as they appear at different document levels
const getLanguageQry = language => `(language.locale: ${language.key} OR unit.language.locale: ${language.key})`;
const getTagQry = tag => `tags.name.keyword: ${tag}~2 OR unit.tags.name.keyword: ${tag}`;

const getCategoryQry = ( categories ) => {
  let qry = '';
  const len = categories.length;
  categories.forEach( ( category, index ) => {
    qry += `categories.id.keyword: ${escape( category.key )} OR unit.categories.id.keyword: ${escape( category.key )}`;
    if ( index < len - 1 ) qry += ' OR ';
  } );

  return `(${qry})`;
};

/* Need to add a keyword analyzer  before we can use this method
const getSourceQry = ( sources ) => {
  let qry = '';
  const len = sources.length;
  sources.forEach( ( source, index ) => {
    qry += `owner.keyword: ${source.display_name}`;
    if ( index < len - 1 ) qry += ' OR ';
  } );
  return `(${qry})`;
};
*/

const getPostTypeQry = ( types ) => {
  let qry = '';
  const len = types.length;
  types.forEach( ( type, index ) => {
    qry += `type.keyword: ${type.key}`;
    if ( index < len - 1 ) qry += ' OR ';
  } );

  return `(${qry})`;
};

/**
 * Return an array of unique selected types
 * Set object only accepts unique values
 *
 * @param {array} types Selected post types
 * @return Array of unique post types
 */
const getQryFields = ( types = [] ) => {
  const set = new Set();

  types.forEach( ( t ) => {
    const flds = fields[t.key];
    if ( flds ) {
      flds.forEach( fld => set.add( fld ) );
    }
  } );

  return [...set];
};

const escapeRegExp = string => string.replace( /[.*+-=&!?^~${}()|[\]\\]/g, '\\$&' );

/**
 * If there are an odd number of quotes in the query string is will cause
 * an error. So in that case a string is returned with some quotes escaped
 * to prevent error.
 *
 * @param str
 * @returns string
 */
const maybeFixQuotes = ( str ) => {
  const quoteCount = str.replace( /[^"]/g, '' ).length;

  // If only 1 quote then escape it
  if ( quoteCount === 1 ) return str.replace( '"', '\\"' );
  // If an odd number of quotes then escape all the ones in the middle
  else if ( quoteCount % 2 === 1 ) {
    const parts = str.split( '"' );
    return `${parts[0]}"${parts.slice( 1, -1 ).join( '\\"' )}"${parts[parts.length - 1]}`;
  }
  return str;
};

export const queryBuilder = ( store ) => {
  const body = new Bodybuilder();
  const options = [];
  const hasSelectedTypes = store.type.currentPostTypes.length;

  if ( store.language.currentLanguage ) {
    options.push( getLanguageQry( store.language.currentLanguage ) );
  }

  if ( store.search.author ) {
    options.push( `author.name: ${store.search.author}` );
  }

  if ( store.search.tag ) {
    options.push( getTagQry( store.search.tag ) );
  }

  if ( store.category.currentCategories.length ) {
    options.push( getCategoryQry( store.category.currentCategories ) );
  }

  /* Need to add an elastic keyword analyzer to the owner prop
     mapping before we can query via query string
     options.push( getSourceQry( store.source.currentSources ) );
    */
  if ( store.source.currentSources.length ) {
    store.source.currentSources.forEach( ( source ) => {
      source.key.forEach( ( src ) => {
        body.orFilter( 'term', 'owner.keyword', src );
      } );
    } );
  }

  if ( hasSelectedTypes ) {
    options.push( getPostTypeQry( store.type.currentPostTypes ) );
  }

  if ( store.date.currentDate.key !== 'recent' ) {
    if ( store.date.currentDate.key !== 'custom' ) {
      body.filter( 'range', 'published', { gte: store.date.currentDate.key } );
    } else if ( store.date.dateSelect === 'custom' ) {
      body.filter( 'range', 'published', {
        gte: store.date.from,
        lte: store.date.to,
        format: 'MM/dd/yyyy'
      } );
    }
  }

  if ( store.search.sort === 'published' ) {
    body.sort( 'published', 'desc' );
  }

  const optionStr = options.reduce( ( acc, value, index, arr ) => {
    if ( index === arr.length - 1 ) {
      acc += value;
    } else {
      acc += `${value} AND `;
    }
    return acc;
  }, '' );

  // add original search query last
  if ( store.search.query && store.search.query.trim() ) {
    const qryObj = { query: `(${maybeFixQuotes( escapeRegExp( store.search.query ) )}) AND (${optionStr})` };
    if ( hasSelectedTypes ) {
      qryObj.fields = getQryFields( store.type.currentPostTypes );
    } else {
      qryObj.fields = getQryFields( store.type.list );
    }
    body.query( 'query_string', qryObj );
  } else {
    body.query( 'query_string', 'query', optionStr );
  }

  // Do not fetch courses or page content type
  body.notQuery( 'match', 'type.keyword', 'courses' );
  body.notQuery( 'match', 'type.keyword', 'page' );

  body.agg( 'terms', 'unit.categories.id.keyword', { size: 100 }, 'unitId' );
  body.agg( 'terms', 'categories.id.keyword', { size: 100 }, 'id' );
  body.agg( 'terms', 'owner.keyword', { size: 100 }, 'source' );

  // body.query( 'query_string', 'query', optionStr ); // return all for TESTING
  return body.build();
};

export const ScrollToTop = () => {
  window.scrollTo( 0, 0 );
  return null;
};
