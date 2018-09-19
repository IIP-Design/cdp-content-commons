import projectFilesReducer from '../reducer';

describe( 'projectFilesReducer', () => {
  it( 'returns the initial state', () => {
    expect( projectFilesReducer( undefined, {} ) ).toEqual( {} );
  } );
});
