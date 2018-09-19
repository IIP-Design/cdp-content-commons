import projectHeaderReducer from '../reducer';

describe( 'projectHeaderReducer', () => {
  it( 'returns the initial state', () => {
    expect( projectHeaderReducer( undefined, {} ) ).toEqual( {} );
  } );
});
