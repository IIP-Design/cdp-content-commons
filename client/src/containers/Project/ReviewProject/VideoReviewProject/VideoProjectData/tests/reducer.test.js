import videoProjectDataReducer from '../reducer';

describe( 'videoProjectDataReducer', () => {
  it( 'returns the initial state', () => {
    expect( videoProjectDataReducer( undefined, {} ) ).toEqual( {} );
  } );
});
