import * as React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from "classnames";
import {LoginRequest} from "../api";
import {useDispatch} from "react-redux";
import {login} from "../modules/Auth/actionApi";


export interface LoginFormProps {
    onLogin?: (data: LoginRequest) => void;
}

const LoginSchema = yup.object().shape({
    username: yup.string().required("This field is required"),
    password: yup.string().required("This field is required"),
});

export function LoginForm({ onLogin}: LoginFormProps) {
    const {register, handleSubmit, reset, errors, setError} = useForm<LoginRequest>({validationSchema: LoginSchema});
    const dispatch = useDispatch();

    const handleLogin = async (data: LoginRequest) => {
        try {
            await dispatch(login(data));
            reset();
            onLogin && onLogin(data);
        } catch (errors) {
            errors && Object.keys(errors).forEach(key => {
                setError(key, key, errors[key])
            });
        }
    };

    console.log('render LoginForm');
    return (
        <form className="create-todo-form" onSubmit={handleSubmit(handleLogin)}>
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
