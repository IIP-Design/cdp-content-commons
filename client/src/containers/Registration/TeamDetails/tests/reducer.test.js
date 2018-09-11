import teamDetailsReducer from '../reducer';

describe( 'teamDetailsReducer', () => {
  it( 'returns the initial state', () => {
    expect( teamDetailsReducer( undefined, {} ) ).toEqual( {} );
  } );
});
