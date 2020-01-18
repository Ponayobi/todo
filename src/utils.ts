import {Dispatch} from "redux";

export function withDispatch(func: any) {
    return <T>(request: T) => (dispatch: Dispatch, getState: void) => func(request)(dispatch, getState);
}
