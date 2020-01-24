import { Dispatch } from "redux";
import { RootState } from "../../store";
import {
    createTodoRequest,
    editTodoRequest,
    getTodoListRequest,
    CreateTodoRequest,
    Todo,
    GetTodoListFilters, EditTodoRequest
} from "../../api";
import { success, error } from 'react-notification-system-redux';
import {setTodo, replaceTodo, setTodoList, replaceTodoFilters, setTodoTotalCount} from "./actions";
import { push } from "connected-react-router";
import {TodoFilters} from "./index";
import {AxiosError} from "axios";

export const getTodoList = (filters?: TodoFilters) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        const { todo: { filters: { sortField = 'id', pageNumber = 1, sortDirection = 'asc' } } } = getState();
        const requestData: GetTodoListFilters = {
            sort_direction: filters?.sortDirection || sortDirection,
            sort_field: filters?.sortField || sortField,
            page: filters?.pageNumber || pageNumber,
        };

        const request = await getTodoListRequest(requestData);
        dispatch(setTodoList(request.data.tasks));
        dispatch(setTodoTotalCount(parseInt(request.data.total_task_count)));
        filters && dispatch(replaceTodoFilters(filters));
    } catch (e) {
        dispatch(error({
            title: "Error getting Todo list",
            message: (e as AxiosError).message,
        }));
        const { response } = (e as AxiosError);
        return Promise.reject(response?.data);
    }
};

export const createTodo = (todo: Todo) => async (dispatch: Dispatch) => {
    try {
        const requestData: CreateTodoRequest = {
            text: todo.text,
            username: todo.username,
            email: todo.email,
        };

        const response = await createTodoRequest(requestData);
        dispatch(setTodo(response.data));
        dispatch(success({
            message: 'Todo successfully added',
            position: 'bc',
            autoDismiss: 10,
        }));
    } catch (e) {
        dispatch(error({
            title: "Error creating Todo",
            message: (e as AxiosError).message,
        }));
        const { response } = (e as AxiosError);
        return Promise.reject(response?.data);
    }
};

export const editTodo = (todo: Todo) => async (dispatch: Dispatch, getState: () => RootState) => {
    try {
        const { auth: { accessToken } } = getState();
        const requestData: EditTodoRequest = {
            ...todo,
            token: accessToken,
        };
        await editTodoRequest(requestData);
        dispatch(replaceTodo(todo));
        dispatch(success({
            message: 'Todo successfully updated',
            position: 'bc',
            autoDismiss: 10,
        }));
        dispatch(push('/'));
    } catch (e) {
        dispatch(error({
            title: "Error editing Todo",
            message: (e as AxiosError).message,
        }));
        const { response } = (e as AxiosError);
        return Promise.reject(response?.data);
    }
};
