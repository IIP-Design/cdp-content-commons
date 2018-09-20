import videoProjectFilesReducer from '../reducer';

describe( 'videoProjectFilesReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoProjectFilesReducer( undefined, {} ) ).toEqual( {} );
  } );
});
