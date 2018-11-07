import editSingleProjectItemReducer from '../reducer';

describe( 'editSingleProjectItemReducer', () => {
  it( 'returns the initial state', () => {
    expect( editSingleProjectItemReducer( undefined, {} ) ).toEqual( {} );
  } );
});
