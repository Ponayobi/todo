import * as React from "react";
import classNames from "classnames";
import {TodoItem} from "../components/TodoItem";
import {TodoListTask, TodoListTaskStatus} from "../api";
import {useHistory, useRouteMatch} from "react-router-dom";
import {useSelector} from "react-redux";
import {RootState} from "../store";

export interface TodoListProps {
    todoItems: TodoListTask[];
}

export function TodoList({ todoItems }: TodoListProps) {
    const { path } = useRouteMatch();
    const { push } = useHistory();
    const isAuth = useSelector((state: RootState) => !!state.auth.accessToken);

    const handleClickEdit = (id: number) => {
        push(`${path}/edit/${id}`);
    };

    console.log('render TodoList');
    return (
        <ul className="todo-list">
            {todoItems.map((todo) => (
                <li key={todo.id} className={classNames({
                    completed: todo.status === TodoListTaskStatus.Complete
                })}>
                    <TodoItem todo={todo} canEdit={isAuth} onEdit={handleClickEdit} />
                </li>
            ))}
        </ul>
    );
}
