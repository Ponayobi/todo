import * as React from "react";
import classNames from "classnames";
import { TodoItem } from "../components/TodoItem";
import { TodoStatus} from "../api";
import { useRouteMatch } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "../store";
import { push } from "connected-react-router";

export interface TodoListProps {}

export function TodoList() {
    const dispatch = useDispatch();
    const todoItems = useSelector(({ todo }: RootState) => todo.items);
    const isAuth = useSelector((state: RootState) => !!state.auth.accessToken);
    const { path } = useRouteMatch();

    if (!todoItems || !todoItems.length) return null;

    const handleClickEdit = (id: number) => {
        dispatch(push(`${path}/edit/${id}`));
    };

    console.log('render TodoList');
    return (
        <ul className="todo-list">
            {todoItems.map((todo) => (
                <li key={todo.id} className={classNames({
                    completed: todo.status === TodoStatus.Complete
                })}>
                    <TodoItem todo={todo} canEdit={isAuth} onEdit={handleClickEdit} />
                </li>
            ))}
        </ul>
    );
}
