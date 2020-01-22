import { Dispatch } from "redux";
import { AxiosError } from "axios";
import { error, success } from "react-notification-system-redux";
import { push } from 'connected-react-router';
import { loginRequest, LoginRequest } from "../../api";
import { setToken } from "./actions";

export const login = (requestData: LoginRequest) => async (dispatch: Dispatch) => {
    try {
        const response = await loginRequest(requestData);
        dispatch(setToken(response.data.token));
        dispatch(success({
            message: 'You have successfully logged in',
            position: 'bc',
            autoDismiss: 10,
        }));
        dispatch(push('/'));
    } catch (e) {
        dispatch(error({
            title: "Login Error",
            message: (e as AxiosError).message,
        }));
        const { response } = (e as AxiosError);
        return Promise.reject(response?.data);
    }
};
