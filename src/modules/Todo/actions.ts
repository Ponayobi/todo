import { createAction } from 'redux-act';
import {
    TodoListTask,
    GetTodoListResponse,
    GetTodoListRequest
} from "../../api";

export const createTodo = createAction<TodoListTask>('Todo.create');
export const updateTodo = createAction<TodoListTask>('Todo.update');
export const updateTodoList = createAction<GetTodoListResponse>('Todo.updateList');

export const updateTodoFilter = createAction<GetTodoListRequest>('Todo.changePage');
