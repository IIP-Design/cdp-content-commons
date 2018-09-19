import projectSupportFilesReducer from '../reducer';

describe( 'projectSupportFilesReducer', () => {
  it( 'returns the initial state', () => {
    expect( projectSupportFilesReducer( undefined, {} ) ).toEqual( {} );
  } );
});
