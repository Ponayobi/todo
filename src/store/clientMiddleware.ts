import {Action, Middleware, MiddlewareAPI, Dispatch, AnyAction} from 'redux';
import { RootState } from './index';
import {logout} from "../modules/Auth/actions";

export interface ClientDispatch<S, E, A extends Action> {
    <T extends A>(action: T): T;
    <R>(asyncAction: ClientAction<R, S, E, A>): R;
}

export type ClientAction<R, S, E, A extends Action> = (
    dispatch: ClientDispatch<S, E, A>,
    getState: () => S,
    extraArgument: E
) => R;

export type ClientMiddleware<S = {}, A extends Action = AnyAction, E = undefined> = Middleware<ClientDispatch<S, E, A>, S, ClientDispatch<S, E, A>>;

export const clientMiddleware: ClientMiddleware<RootState> =
    <S extends RootState>({dispatch,getState}: MiddlewareAPI<Dispatch, S>) =>
        (next: Dispatch) => async <A extends Action>(action: A | any): Promise<A | any> => {

    const { auth :{ accessTokenExp }} = getState();

    if (accessTokenExp) {
        const currentTime = Date.now().valueOf();

        if (accessTokenExp <= currentTime) {
            dispatch(logout());
        }
    }

    return next(action);
};
