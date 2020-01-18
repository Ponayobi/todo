import * as React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from "classnames";
import { TodoListTask, TodoListTaskStatus} from "../api";
import { useParams } from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";

export interface CreateTodoFormProps {
    onEdit: (data: TodoListTask) => void;
}

const EditTodoSchema = yup.object().shape({
    status: yup.boolean().required(),
    text: yup.string().required("This field is required"),
});

interface EditTodoTaskFormData {
    status: boolean;
    text: string;
}

export function EditTodoTaskForm({ onEdit }: CreateTodoFormProps) {
    const { todoId } = useParams();
    const todo = useSelector((state: RootState) => state.todo.items.find((item) => item.id.toString() === todoId ));
    const {register, handleSubmit, errors} = useForm<EditTodoTaskFormData>({validationSchema: EditTodoSchema});

    if (!todo) {
        return (
            <div>Not found</div>
        );
    }

    const onSubmit = (data: EditTodoTaskFormData) => {
        onEdit({
            ...todo,
            ...data,
            status: data.status ? TodoListTaskStatus.Complete : TodoListTaskStatus.NoCompleted,
        });
    };

    console.log('render EditTodoTaskForm');
    return (
        <form className="create-todo-form" onSubmit={handleSubmit(onSubmit)}>
            <div className="create-todo-form__field">
                <div className="new-todo">
                    Completed: <input type="checkbox" name="status" defaultChecked={todo.status === TodoListTaskStatus.Complete} ref={register} />
                </div>
            </div>
            <div className={classNames("create-todo-form__field", {error: errors.text})}>
              <textarea
                  ref={register({required: true})}
                  name="text"
                  className="new-todo"
                  placeholder="What needs to be done?"
                  autoFocus={true}
              >
                  {todo.text}
              </textarea>
                {errors.text && (
                    <div className="create-todo-form__error-message">
                        {errors.text.message}
                    </div>
                )}
            </div>
            <div className="create-todo-form__field">
                <div className="create-todo-form__field">
                    <input className="new-todo disabled" disabled value={todo.username} />
                </div>
                <div className="create-todo-form__field">
                    <input className="new-todo disabled" disabled value={todo.email} />
                </div>
            </div>

            <div className="create-todo-form__field">
                <button type="submit" className="submit-btn">Update</button>
            </div>
        </form>
    );
}
