import editSupportFileRowReducer from '../reducer';

describe( 'editSupportFileRowReducer', () => {
  it( 'returns the initial state', () => {
    expect( editSupportFileRowReducer( undefined, {} ) ).toEqual( {} );
  } );
});
