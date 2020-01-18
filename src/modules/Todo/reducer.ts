import { createReducer } from 'redux-act';
import { TodoState } from './index';
import {createTodo, updateTodoList, updateTodo, updateTodoFilter} from "./actions";

const defaultState: TodoState = {
    items: [],
    totalCount: 0,
    filter: {
        sort_field: "id",
        page: 1,
        sort_direction: "desc",
    },
};

export const todoReducer = createReducer({}, defaultState);
todoReducer.on(createTodo, (state, payload) => {
    let items = [payload, ...state.items];
    if (state.totalCount > 2) {
        items = items.slice(0, -1);
    }
    return ({ ...state, items, totalCount: state.totalCount + 1 });
});
todoReducer.on(updateTodo, (state, payload) => {
    const index = state.items.findIndex(({ id }) => id === payload.id);
    return ({ ...state, items: [ ...state.items.slice(0, index), { ...state.items[index], ...payload }, ...state.items.slice(index + 1) ] });
});
todoReducer.on(updateTodoList, (state, payload) => ({ ...state, items: payload.tasks, totalCount: parseInt(payload.total_task_count) }));
todoReducer.on(updateTodoFilter, (state, payload) => ({ ...state, filter: payload }));
