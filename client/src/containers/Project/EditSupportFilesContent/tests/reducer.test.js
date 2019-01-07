import editSupportFilesContentReducer from '../reducer';

describe( 'editSupportFilesContentReducer', () => {
  it( 'returns the initial state', () => {
    expect( editSupportFilesContentReducer( undefined, {} ) ).toEqual( {} );
  } );
});
