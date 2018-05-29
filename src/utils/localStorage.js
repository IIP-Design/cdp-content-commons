export const localStorageInitFilterState = ( filterType ) => {
  const localStorageData = localStorage.getItem( 'selections' ) !== ''
    ? JSON.parse( localStorage.getItem( 'selections' ) )
    : null;

  const localStorageFilter = localStorageData
    && localStorageData.filter( item => item.filter === filterType ).length > 0
    ? localStorageData.filter( item => item.filter === filterType )
    : null;

  if ( !localStorageFilter ) return null;

  const filterTypes = [];

  localStorageFilter.forEach( ( filter ) => {
    if ( filter.filter === 'format' || filter.filter === 'source' ) {
      filterTypes.push( { type: filter.value, display_name: filter.label } );
    }

    if ( filter.filter === 'date' ) {
      filterTypes.push( { key: filter.value, display: filter.label } );
    }

    if ( filter.filter === 'language' ) {
      filterTypes.push( { key: filter.value, display_name: filter.label } );
    }

    if ( filter.filter === 'category' ) {
      filterTypes.push( { id: filter.value, display_name: filter.label } );
    }
  } );
  return filterTypes;
};
