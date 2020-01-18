import * as React from "react";
import { TodoListTask, TodoListTaskStatus } from "../api";

export interface TodoItemProps {
    canEdit: boolean;
    todo: TodoListTask;
    onEdit: (id: number) => void;
}

export function TodoItem({ todo, onEdit, canEdit }: TodoItemProps) {
    const handleClickEdit = () => {
        onEdit(todo.id);
    };
    return (
        <div className="view">
            <input
                className="toggle"
                type="checkbox"
                checked={todo.status === TodoListTaskStatus.Complete}
            />
            <label>
                {todo.text}
            </label>
            <label className="user-info">
                Username: {todo.username}, Email: {todo.email}
            </label>
            {canEdit && (
                <React.Fragment>
                    <button className="edit-item-button" onClick={handleClickEdit} />
                </React.Fragment>
            )}
        </div>
    );
}
