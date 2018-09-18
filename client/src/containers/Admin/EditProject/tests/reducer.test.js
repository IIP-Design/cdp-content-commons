import EditProjectReducer from '../reducer';

describe( 'EditProjectReducer', () => {
  it( 'returns the initial state', () => {
    expect( EditProjectReducer( undefined, {} ) ).toEqual( {} );
  } );
} );
