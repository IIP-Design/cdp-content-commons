import authReducer from '../reducer';
import { LOGIN, LOGOUT } from '../constants';

describe( 'authReducer', () => {
  let state;
  beforeEach( () => {
    state = {
      authenticated: null,
      errorMessage: ''
    };
  } );

  // Test initial state
  it( 'returns the initial state', () => {
    const expectedResult = state;
    expect( authReducer( undefined, {} ) ).toEqual( expectedResult );
  } );

  // Test login state
  it( 'returns the login state', () => {
    const action = {
      type: LOGIN,
      payload: {
        id: 'tsfjepxnsffgfsedd',
        email: 'jdoe@america.gov',
        name: 'Jane Joe'
      }
    };

    const newState = authReducer( state, action );
    expect( newState ).toEqual( expect.objectContaining( {
      authenticated: {
        id: expect.any( String ),
        email: expect.any( String ),
        name: expect.any( String )
      }
    } ) );
  } );

  // Test logout  state
  it( 'returns the logout state', () => {
    const loginState = {
      authenticated: {
        id: 'tsfjepxnsffgfsedd',
        email: 'jdoe@america.gov',
        name: 'Jane Joe'
      },
      errorMessage: ''
    };

    const action = {
      type: LOGOUT,
      payload: ''
    };

    expect( authReducer( loginState, action ) ).toEqual( state );
  } );
} );

