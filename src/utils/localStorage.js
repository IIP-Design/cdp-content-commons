export const localStorageInitFilterState = ( filterType ) => {
  const localStorageData = localStorage.getItem( 'selections' ) !== ''
    ? JSON.parse( localStorage.getItem( 'selections' ) )
    : null;

  const localStorageFilter = localStorageData
    && localStorageData.filter( item => item.filter === filterType ).length > 0
    ? localStorageData.filter( item => item.filter === filterType )
    : null;

  if ( !localStorageFilter ) return null;

  const initPostTypes = [];
  localStorageFilter.map( filter => initPostTypes.push( {
    type: filter.value,
    display_name: filter.label
  } ) );

  return initPostTypes;
};
