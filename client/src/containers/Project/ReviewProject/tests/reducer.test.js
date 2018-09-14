import reviewProjectReducer from '../reducer';

describe( 'reviewProjectReducer', () => {
  it( 'returns the initial state', () => {
    expect( reviewProjectReducer( undefined, {} ) ).toEqual( {} );
  } );
});
