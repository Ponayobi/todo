import api, {ApiResponse} from './api';

export type GetTodoListSortField = "id" | "username" | "email" | "status";
export type GetTodoListSortDirection = "asc" | "desc";
export interface GetTodoListRequest {
    sort_field: GetTodoListSortField;
    sort_direction: GetTodoListSortDirection;
    page: number;
}
export enum TodoListTaskStatus {
    NoCompleted = 0,
    Complete = 10,
}
export type TodoListTask = {
    id: number;
    username: string;
    email: string;
    text: string;
    status: TodoListTaskStatus;
}
export interface GetTodoListResponse {
    tasks: TodoListTask[];
    total_task_count: string;
}
export interface CreateTodoListTaskRequest {
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
export interface UpdateTodoRequest extends TodoListTask {
    token?: string;
}

async function getTodoList(params?: GetTodoListRequest): Promise<ApiResponse<GetTodoListResponse>> {
    return await api.get<GetTodoListResponse>('/', params);
}

async function createTodoListTask(params: CreateTodoListTaskRequest): Promise<ApiResponse<TodoListTask>> {
    return await api.post<TodoListTask>('/create', params);
}

async function login(params: LoginRequest): Promise<ApiResponse<LoginResponse>> {
    return await api.post<LoginResponse>('/login', params);
}

async function updateTodoListTask(params: UpdateTodoRequest): Promise<ApiResponse<TodoListTask>> {
    return await api.post<TodoListTask>(`/edit/${params.id}`, { text: params.text, status: params.status, token: params.token })
        .then((response) => {
            return {
                ...response,
                message: params
            };
        });
}

export {
    getTodoList,
    createTodoListTask,
    login,
    updateTodoListTask,
}
