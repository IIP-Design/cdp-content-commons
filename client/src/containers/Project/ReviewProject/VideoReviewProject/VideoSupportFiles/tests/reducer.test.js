import videoSupportFilesReducer from '../reducer';

describe( 'videoSupportFilesReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoSupportFilesReducer( undefined, {} ) ).toEqual( {} );
  } );
});
