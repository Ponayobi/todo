import { Todo, TodoListSortDirection, TodoListSortField } from "../../api";

export interface EditableTodo extends Todo {
    isEdited: boolean;
}

export interface TodoFilters {
    sortField: TodoListSortField;
    sortDirection: TodoListSortDirection;
    pageNumber: number;
}

export interface TodoState {
    items: EditableTodo[];
    totalCount: number;
    filters: TodoFilters;
}
