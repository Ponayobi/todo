import {
    createTodoListTask,
    updateTodoListTask,
    getTodoList,
    CreateTodoListTaskRequest,
    TodoListTask,
    GetTodoListRequest, UpdateTodoRequest
} from "../../api";
import {Dispatch} from "redux";
import {createTodo, updateTodo, updateTodoList, updateTodoFilter} from "./actions";
import {RootState} from "../../store";

export const createTaskRequest = (request: CreateTodoListTaskRequest) => async (dispatch: Dispatch) => {
    const task = await createTodoListTask(request);
    task.message && dispatch(createTodo(task.message));
};
export const updateTaskRequest = (request: TodoListTask) => async (dispatch: Dispatch, getState: () => RootState) => {
    const { auth: { accessToken } } = getState();

    const data: UpdateTodoRequest = {
        ...request,
        token: accessToken,
    };
    const task = await updateTodoListTask(data);
    task.message && dispatch(updateTodo(task.message));
};
export const getTodoListRequest = (request?: GetTodoListRequest) => async (dispatch: Dispatch) => {
    const task = await getTodoList(request);
    request && dispatch(updateTodoFilter(request));
    task.message && dispatch(updateTodoList(task.message));
};
