import {Dispatch} from "redux";

export function withDispatch(func: any) {
    return <T>(request: T) => (dispatch: Dispatch, getState: void) => func(request)(dispatch, getState);
}

export function generateKey(pre: string | number): string {
    return `${pre}_${ new Date().getTime() }`;
}

export function generateFormData(obj: any) {
    const result = new FormData();
    Object.keys(obj).forEach(key => result.append(key, obj[key]));
    return result;
}