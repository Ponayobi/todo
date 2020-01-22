import { createReducer } from 'redux-act';
import {EditableTodo, TodoState} from './index';
import { setTodo, replaceTodo, replaceTodoFilters, setTodoList, setTodoTotalCount } from "./actions";

const defaultState: TodoState = {
    items: [],
    totalCount: 0,
    filters: {
        sortField: "id",
        pageNumber: 1,
        sortDirection: "desc",
    },
};

export const todoReducer = createReducer({}, defaultState);
todoReducer.on(setTodo, (state, payload) => {
    let items = [ { ...payload, isEdited: false }, ...state.items];
    if (state.totalCount > 2) {
        items = items.slice(0, -1);
    }
    return ({ ...state, items, totalCount: state.totalCount + 1 });
});
todoReducer.on(replaceTodo, (state, payload) => {
    const index = state.items.findIndex(({ id }) => id === payload.id);
    const oldTodo: EditableTodo = state.items[index];
    const newTodo: EditableTodo = { ...oldTodo, ...payload };

    if (!oldTodo.isEdited && oldTodo.text !== newTodo.text) {
        newTodo.isEdited = true;
    }

    return ({ ...state, items: [ ...state.items.slice(0, index), newTodo, ...state.items.slice(index + 1) ] });
});
todoReducer.on(setTodoList, (state, payload) => ({ ...state, items: payload.map((todo) => ({ ...todo, isEdited: false })) }));
todoReducer.on(setTodoTotalCount, (state, payload) => ({ ...state, totalCount: payload }));
todoReducer.on(replaceTodoFilters, (state, payload) => ({ ...state, filters: { ...state.filters, ...payload } }));
