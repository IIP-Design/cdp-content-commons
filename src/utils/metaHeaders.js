// Check if property exists, and if so push to properties array
const checkAndPush = ( array, property, content ) => {
  if ( content ) {
    const newMeta = {
      property,
      content
    };

    array.push( newMeta );
  }
};

const populateMetaArray = ( item ) => {
  const {
    description, thumbnail, selectedLanguageUnit, title, type
  } = item;

  const ogType = ( type && type === 'video' ) ? 'video' : 'article';
  const cardType = ( type && type === 'video' ) ? 'player' : 'summary';

  const videoSrc = ( ( selectedLanguageUnit || {} ).source || {} )[0] || {};
  const streamSrc = ( videoSrc.stream || {} ).link || '';

  // Initialize metavalue array with common properties
  const metaArr = [
    {
      property: 'og:site_name',
      content: 'Content Commons'
    },
    {
      property: 'og:type',
      content: ogType
    },
    {
      property: 'og:url',
      content: window.location.href
    },
    {
      property: 'twitter:card',
      content: cardType
    }
  ];

  const propsArray = [
    {
      property: 'og:description',
      content: description
    },
    {
      property: 'og:image',
      content: thumbnail
    },
    {
      property: 'og:title',
      content: title
    },
    {
      property: 'og:video:url',
      content: streamSrc
    },
    {
      property: 'twitter:player',
      content: streamSrc
    }
  ];

  // Checks desired meta tags against items
  propsArray.forEach( ( propPair ) => {
    checkAndPush( metaArr, propPair.property, propPair.content );
  } );

  return metaArr;
};

// Creates a meta tag for each property and adds it to the head tag
const addToHead = ( array ) => {
  array.forEach( ( pair ) => {
    const metaLine = document.createElement( 'meta' );

    metaLine.setAttribute( 'property', pair.property );
    metaLine.content = pair.content;

    document.head.appendChild( metaLine );
  } );
};

// Converts item object into metavalues
export const setPageMetavalues = async ( item ) => {
  const metaArray = await populateMetaArray( item );

  addToHead( metaArray );
};
