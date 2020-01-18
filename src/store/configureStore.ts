import { createStore, applyMiddleware, compose } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reduxThunk from 'redux-thunk';


import { rootReducer } from './rootReducer';
import { clientMiddleware } from "./clientMiddleware";

export const persistConfig = {
    key: 'root',
    storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const initialState = {};

export function configureStore() {
    const composeEnhancers = (window as any).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
    const enhancer = composeEnhancers(
        applyMiddleware(clientMiddleware, reduxThunk),
    );

    const store = createStore(persistedReducer, initialState, enhancer);
    const persistor = persistStore(store);

    return { store, persistor };
}

