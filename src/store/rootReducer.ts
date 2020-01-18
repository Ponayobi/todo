import { combineReducers } from 'redux';

import { authReducer } from '../modules/Auth/reducer';
import { todoReducer } from "../modules/Todo/reducer";

export const rootReducer = combineReducers({
    auth: authReducer,
    todo: todoReducer,
});
