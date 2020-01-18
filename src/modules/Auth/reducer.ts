import { createReducer } from 'redux-act';
import { AuthState } from './store';
import {logout, setToken} from './actions';

const defaultState: AuthState = {};

export const authReducer = createReducer({}, defaultState);
authReducer.on(setToken, (state, payload) => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return { ...state, accessToken: payload, accessTokenExp: date.getTime()};
});
authReducer.on(logout, (state) => defaultState);
