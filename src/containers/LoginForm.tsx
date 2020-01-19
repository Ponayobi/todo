import * as React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from "classnames";
import {CreateTodoListTaskRequest, LoginRequest} from "../api";
import {useDispatch} from "react-redux";
import {loginRequest} from "../modules/Auth/actionApi";
import { useHistory } from "react-router-dom";

export interface CreateTodoFormProps {}

const LoginSchema = yup.object().shape({
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
});

export function LoginForm() {
    const {register, handleSubmit, watch, errors, setError} = useForm<LoginRequest>({validationSchema: LoginSchema});
    const dispatch = useDispatch();

    const onLogin = async (data: LoginRequest) => {
        const response: any = await dispatch(loginRequest(data));
        if (response) {
            Object.keys(response.message).forEach(key => {
                console.log(response.message[key]);
                setError(key, key, response.message[key])
            });
        }
    };

    console.log('render LoginForm');
    return (
        <form className="create-todo-form" onSubmit={handleSubmit(onLogin)}>
            <div className={classNames("create-todo-form__field", {error: errors.username})}>
              <input
                  ref={register({required: true})}
                  name="username"
                  className="new-todo"
                  placeholder="Username"
                  autoFocus={true}
              />
                {errors.username && (
                    <div className="create-todo-form__error-message">
                        {errors.username.message}
                    </div>
                )}
            </div>
            <div className={classNames("create-todo-form__field", {error: errors.password})}>
              <input
                  ref={register({required: true})}
                  name="password"
                  className="new-todo"
                  placeholder="password"
              />
                {errors.password && (
                    <div className="create-todo-form__error-message">
                        {errors.password.message}
                    </div>
                )}
            </div>

            <div className="create-todo-form__field">
                <button type="submit" className="submit-btn">Login</button>
            </div>
        </form>
    );
}
