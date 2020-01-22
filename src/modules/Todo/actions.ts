import { createAction } from 'redux-act';
import { Todo } from "../../api";
import { TodoFilters } from "./index";

export const setTodo = createAction<Todo>('Todo.set');
export const replaceTodo = createAction<Todo>('Todo.set');
export const setTodoList = createAction<Todo[]>('Todo.setList');
export const setTodoTotalCount = createAction<number>('Todo.setTotalCount');
export const replaceTodoFilters = createAction<TodoFilters>('Todo.replaceFilters');
