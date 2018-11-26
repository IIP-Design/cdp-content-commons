import { selectAuth } from '../selectors';

describe( 'selectAuth', () => {
  it( 'should select the auth state', () => {
    const authState = {};
    const mockedState = {
      auth: authState
    };
    expect( selectAuth( mockedState ) ).toEqual( authState );
  } );
} );
