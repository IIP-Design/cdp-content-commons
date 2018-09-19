import projectDataReducer from '../reducer';

describe( 'projectDataReducer', () => {
  it( 'returns the initial state', () => {
    expect( projectDataReducer( undefined, {} ) ).toEqual( {} );
  } );
});
