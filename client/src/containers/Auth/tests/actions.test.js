import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { LOGIN } from '../constants';

import * as actions from '../actions';

const history = {
  goBack: jest.fn()
};

const middlewares = [thunk];
const mockStore = configureMockStore( middlewares );

const user = {
  id: 'fdjkwejew',
  email: 'janedoe@getMaxListeners.com',
  name: 'Jane Doe'
};

// TODO: googleLogin still not mocking correctly
describe( 'Login actions', () => {
  it( 'Should dispatch LOGIN action and set authorized user', () => {
    jest.spyOn( actions, 'googleLogin' ).mockReturnValue( user );

    const expectedActions = [{ type: LOGIN, payload: user }];
    const store = mockStore( { auth: { authenticated: {} } } );

    return store.dispatch( actions.willGoogleLogin( history ) ).then( () => {
      // return of async actions
      expect( store.getActions() ).toEqual( expectedActions );
    } );
  } );
} );
