import { Dispatch } from "redux";
import {
    login, LoginRequest
} from "../../api";
import { setToken } from "./actions";
import { success } from "react-notification-system-redux";
import { push } from 'connected-react-router';

export const loginRequest = (request: LoginRequest) => async (dispatch: Dispatch) => {
    const response = await login(request);
    if (response.status !== "ok") return response;

    response.message && dispatch(setToken(response.message.token));
    dispatch(success({
        message: 'You have successfully logged in',
        position: 'bc',
        autoDismiss: 10,
    }));
    dispatch(push('/'));
};
