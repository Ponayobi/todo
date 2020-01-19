import { configureStore, rootReducer } from './configureStore';
import {
    useSelector as useReduxSelector,
    TypedUseSelectorHook,
} from 'react-redux'

export * from './configureStore';

type UnPromise<T> = T extends Promise<infer U> ? U : T;

export type RootState = ReturnType<typeof rootReducer>;
export type Store = UnPromise<ReturnType<typeof configureStore>>;
export const useSelector: TypedUseSelectorHook<RootState> = useReduxSelector;
