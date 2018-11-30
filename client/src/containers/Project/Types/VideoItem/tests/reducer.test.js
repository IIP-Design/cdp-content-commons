import videoItemReducer from '../reducer';

describe( 'videoItemReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoItemReducer( undefined, {} ) ).toEqual( {} );
  } );
});
