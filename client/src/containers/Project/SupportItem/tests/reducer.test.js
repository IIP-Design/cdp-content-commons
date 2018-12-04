import supportItemReducer from '../reducer';

describe( 'supportItemReducer', () => {
  it( 'returns the initial state', () => {
    expect( supportItemReducer( undefined, {} ) ).toEqual( {} );
  } );
});
