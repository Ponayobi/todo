import { combineReducers } from 'redux';
import { reducer as notificationsReducer } from 'react-notification-system-redux';
import { connectRouter } from 'connected-react-router';
import { History, LocationState } from 'history';

import { authReducer } from '../modules/Auth/reducer';
import { todoReducer } from "../modules/Todo/reducer";


export const createRootReducer = (history: History<LocationState>) => combineReducers({
    auth: authReducer,
    todo: todoReducer,
    notifications: notificationsReducer,
    router: connectRouter(history),
});
export default createRootReducer

