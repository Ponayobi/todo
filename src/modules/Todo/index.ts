import {GetTodoListRequest, TodoListTask} from "../../api";

export interface TodoState {
    items: TodoListTask[];
    totalCount: number;
    filter: GetTodoListRequest;
}
