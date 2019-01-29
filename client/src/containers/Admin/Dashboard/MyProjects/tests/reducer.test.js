import myProjectsReducer from '../reducer';

describe( 'myProjectsReducer', () => {
  it( 'returns the initial state', () => {
    expect( myProjectsReducer( undefined, {} ) ).toEqual( {} );
  } );
});
