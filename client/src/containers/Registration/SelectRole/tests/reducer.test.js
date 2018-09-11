import selectRoleReducer from '../reducer';

describe( 'selectRoleReducer', () => {
  it( 'returns the initial state', () => {
    expect( selectRoleReducer( undefined, {} ) ).toEqual( {} );
  } );
});
