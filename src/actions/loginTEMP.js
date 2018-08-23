import { LOGGED_IN, LOGGED_OUT } from './types';

export const login = () => ( {
  type: LOGGED_IN,
  value: true
} );

export const logout = () => ( {
  type: LOGGED_OUT,
  value: false
} );

