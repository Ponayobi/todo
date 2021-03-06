import { createReducer } from 'redux-act';
import { logout, setToken } from './actions';
import { AuthState } from "./index";

const defaultState: AuthState = {};

export const authReducer = createReducer({}, defaultState);
authReducer.on(setToken, (state, payload) => {
    const date = new Date();
    date.setHours(date.getHours() + 24);
    return { ...state, accessToken: payload, accessTokenExp: date.getTime()};
});
authReducer.on(logout, () => defaultState);
