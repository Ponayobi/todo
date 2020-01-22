import * as React from 'react';
import ReactDOM from 'react-dom';
import { ConnectedRouter } from 'connected-react-router';
import { Route, Redirect, RouteProps, Switch } from 'react-router-dom';
import {Provider, useSelector} from 'react-redux';
import {configureStore, RootState, persistConfig } from "./store";
import {getStoredState, Persistor, REHYDRATE} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import { Navigation } from "./containers/Navigation";
import { Home } from './views/Home';
import { Auth } from './views/Auth';
import { Profile } from "./views/Profile";
import { NotificationsSystem } from "./containers/NotificationsSystem";
import { Store } from "redux";
import * as serviceWorker from './serviceWorker';
import {History, LocationState} from "history";
import {useEffect} from "react";
import {getTodoList} from "./modules/Todo/actionApi";

interface SetupProps {
    store: Store,
    persistor: Persistor,
    history: History<LocationState>
}

export function ProtectedRoute({ children, ...rest }: RouteProps) {
    const isAuthenticated = useSelector((state: RootState) => !!state.auth.accessToken);
    return (
        <Route {...rest}>
            {isAuthenticated ? (
                children
            ) : (
                <Redirect
                    to={{
                        pathname: "/login",
                    }}
                />
            )}
        </Route>
    );
}

const Setup= ({ store, persistor, history}: SetupProps) => {
    const dispatch = store.dispatch;

    useEffect(() => {
        // @ts-ignore
        dispatch(getTodoList());
    });

    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <ConnectedRouter history={history}>
                    <Navigation />
                    <Switch>
                        <Redirect exact from="/" to="/home" />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Auth} />
                        <ProtectedRoute path="/profile" component={Profile} />
                    </Switch>
                    <NotificationsSystem />
                </ConnectedRouter>
            </PersistGate>
        </Provider>
    );
};

const { store, persistor, history } = configureStore();

window.addEventListener('storage', async function() {
    let state = await getStoredState(persistConfig);

    store.dispatch({
        type: REHYDRATE,
        key: persistConfig.key,
        payload: state,
    });
});

ReactDOM.render(<Setup store={store} persistor={persistor} history={history} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
