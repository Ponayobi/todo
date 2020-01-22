import * as React from "react";
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import classNames from "classnames";
import { Todo, TodoStatus} from "../api";
import { useParams } from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {RootState} from "../store";
import {editTodo} from "../modules/Todo/actionApi";

export interface CreateTodoFormProps {
    onEdit?: (data: Todo) => void;
}

const EditTodoSchema = yup.object().shape({
    status: yup.boolean().required(),
    text: yup.string().required("This field is required"),
});

interface EditTodoTaskFormData {
    status: boolean;
    text: string;
}
export const EditTodoForm = ({ onEdit }: CreateTodoFormProps) => {
    const dispatch = useDispatch();
    const { todoId } = useParams();
    const todo = useSelector((state: RootState) => state.todo.items.find((item: Todo) => item.id.toString() === todoId ));
    const {register, handleSubmit, errors, setError} = useForm<EditTodoTaskFormData>({validationSchema: EditTodoSchema});

    if (!todo) {
        return (
            <form className="create-todo-form">
                <div className="create-todo-form__field">
                    <div className="submit-btn">
                        The Todo not found!
                    </div>
                </div>
            </form>
        );
    }

    const handleEditTodo = async (data: EditTodoTaskFormData) => {
        const updatedTodo: Todo = {
            ...todo,
            ...data,
            status: data.status ? TodoStatus.Complete : TodoStatus.NoCompleted,
        };

        try {
            await dispatch(editTodo(updatedTodo));
            onEdit && onEdit(updatedTodo);
        } catch (errors) {
            Object.keys(errors).forEach(key => {
                setError(key, key, errors[key])
            });
        }
    };

    console.log('render EditTodoForm');
    return (
        <form className="create-todo-form" onSubmit={handleSubmit(handleEditTodo)}>
            <div className="create-todo-form__field">
                <div className="new-todo">
                    Completed: <input type="checkbox" name="status" defaultChecked={todo.status === TodoStatus.Complete} ref={register} />
                </div>
            </div>
            <div className={classNames("create-todo-form__field", {error: errors.text})}>
              <textarea
                  ref={register({required: true})}
                  name="text"
                  className="new-todo"
                  placeholder="What needs to be done?"
                  autoFocus={true}
                  defaultValue={todo.text}
              />
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
};
