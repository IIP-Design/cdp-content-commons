import videoReviewProjectReducer from '../reducer';

describe( 'videoReviewProjectReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoReviewProjectReducer( undefined, {} ) ).toEqual( {} );
  } );
});
