import { createAction } from 'redux-act';

export const setToken = createAction<string>('Auth.setToken');
export const logout = createAction('Auth.logout');
