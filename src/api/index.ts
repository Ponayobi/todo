import { request } from './api';

export type TodoListSortField = "id" | "username" | "email" | "status";
export type TodoListSortDirection = "asc" | "desc";

export interface GetTodoListFilters {
    sort_field: TodoListSortField;
    sort_direction: TodoListSortDirection;
    page: number;
}
export enum TodoStatus {
    NoCompleted = 0,
    Complete = 10,
}
export type Todo = {
    id: number;
    username: string;
    email: string;
    text: string;
    status: TodoStatus;
}
export interface GetTodoListResponse {
    tasks: Todo[];
    total_task_count: string;
}
export interface CreateTodoRequest {
    username: string;
    email: string;
    text: string;
}
export interface LoginRequest {
    username: string;
    password: string;
}
export interface LoginResponse {
    token: string;
}
export interface EditTodoRequest extends Todo {
    token?: string;
}

function getTodoListRequest(params: GetTodoListFilters) {
    return request<GetTodoListResponse>({
        url: '/',
        params,
    });
}

function createTodoRequest(params: CreateTodoRequest) {
    return request<Todo>({
        url: '/create',
        method: 'post',
        data: params,
    });
}

function editTodoRequest(params: EditTodoRequest) {
    return request<Todo>({
        url: `/edit/${params.id}`,
        method: 'post',
        data: {
            text: params.text,
            status: params.status,
            token: params.token,
        }
    });
}

function loginRequest(params: LoginRequest) {
    return request<LoginResponse>({
        url: '/login',
        method: 'post',
        data: params,
    });
}

export {
    getTodoListRequest,
    createTodoRequest,
    loginRequest,
    editTodoRequest,
}
