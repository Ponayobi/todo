import * as React from "react";
import { TodoStatus } from "../api";
import { EditableTodo } from "../modules/Todo";

export interface TodoItemProps {
    canEdit: boolean;
    todo: EditableTodo;
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
                checked={todo.status === TodoStatus.Complete}
                readOnly
            />
            <label>
                {todo.text}
                {todo.isEdited && <span>Edited by Admin</span>}
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
