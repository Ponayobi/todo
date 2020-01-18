import * as React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from "classnames";
import {CreateTodoListTaskRequest} from "../api";

export interface CreateTodoFormProps {
    onCreate: (data: CreateTodoListTaskRequest) => void;
}

const CreateTodoSchema = yup.object().shape({
    text: yup.string().required("Please enter task description"),
    username: yup.string().required("This field is required"),
    email: yup.string().required("This field is required").email("Please enter valid email"),
});

export function CreateTodoForm({ onCreate }: CreateTodoFormProps) {
    const { register, handleSubmit, errors, reset } =
        useForm<CreateTodoListTaskRequest>({validationSchema: CreateTodoSchema, reValidateMode: "onSubmit"});

    const onSubmit = (data: CreateTodoListTaskRequest) => {
        reset();
        onCreate(data);
    };

    console.log('render CreateTodoForm');
    return (
        <form className="create-todo-form" onSubmit={handleSubmit(onSubmit)}>
            <div className={classNames("create-todo-form__field", {error: errors.text})}>
              <textarea
                  ref={register({required: true})}
                  name="text"
                  className="new-todo"
                  placeholder="What needs to be done?"
                  autoFocus={true}
              />
                {errors.text && (
                    <div className="create-todo-form__error-message">
                        {errors.text.message}
                    </div>
                )}
            </div>
            <div className="create-todo-form__field">
                <div className={classNames("create-todo-form__field", {error: errors.username})}>
                    <input
                        ref={register({required: true})}
                        name="username"
                        className="new-todo"
                        placeholder="Username"
                    />
                    {errors.username && (
                        <div className="create-todo-form__error-message">
                            {errors.username.message}
                        </div>
                    )}
                </div>
                <div className={classNames("create-todo-form__field", {error: errors.email})}>
                    <input
                        ref={register({required: true})}
                        name="email"
                        className="new-todo"
                        placeholder="Email"
                    />
                    {errors.email && (
                        <div className="create-todo-form__error-message">
                            {errors.email.message}
                        </div>
                    )}
                </div>
            </div>

            <div className="create-todo-form__field">
                <button type="submit" className="submit-btn">Create</button>
            </div>
        </form>
    );
}
