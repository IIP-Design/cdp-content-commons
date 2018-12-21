import videoEditVideoReducer from '../reducer';

describe( 'videoEditVideoReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoEditVideoReducer( undefined, {} ) ).toEqual( {} );
  } );
});
