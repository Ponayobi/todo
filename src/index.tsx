import * as React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route, Redirect, useLocation, RouteProps, Switch } from 'react-router-dom';
import {Provider, useSelector} from 'react-redux';
import {configureStore, RootState, persistConfig} from "./store";
import {getStoredState, Persistor, REHYDRATE} from 'redux-persist';
import { PersistGate } from 'redux-persist/integration/react';

import './index.css';
import { Navigation } from "./containers/Navigation";
import { Home } from './views/Home';
import { Auth } from './views/Auth';
import { Profile } from "./views/Profile";
import { Store } from "redux";
import * as serviceWorker from './serviceWorker';

interface SetupProps {
    store: Store,
    persistor: Persistor,
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

const Setup = ({ store, persistor}: SetupProps) => {
    return (
        <Provider store={store}>
            <PersistGate loading={null} persistor={persistor}>
                <Router>
                    <Navigation />
                    <Switch>
                        <Redirect exact from="/" to="/home" />
                        <Route path="/home" component={Home} />
                        <Route path="/login" component={Auth} />
                        <ProtectedRoute path="/profile" component={Profile} />
                    </Switch>
                </Router>
            </PersistGate>
        </Provider>
    );
};

const { store, persistor } = configureStore();

window.addEventListener('storage', async function() {
    let state = await getStoredState(persistConfig);

    store.dispatch({
        type: REHYDRATE,
        key: persistConfig.key,
        payload: state,
    });
});

ReactDOM.render(<Setup store={store} persistor={persistor} />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
