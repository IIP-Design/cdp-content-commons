import reviewSubmitReducer from '../reducer';

describe( 'reviewSubmitReducer', () => {
  it( 'returns the initial state', () => {
    expect( reviewSubmitReducer( undefined, {} ) ).toEqual( {} );
  } );
});
