import videoEditProjectReducer from '../reducer';

describe( 'videoEditProjectReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoEditProjectReducer( undefined, {} ) ).toEqual( {} );
  } );
});
