import {
    login, LoginRequest
} from "../../api";
import {Dispatch} from "redux";
import {setToken} from "./actions";

export const loginRequest = (request: LoginRequest) => async (dispatch: Dispatch) => {
    const response = await login(request);
    response.message && dispatch(setToken(response.message.token));
};
