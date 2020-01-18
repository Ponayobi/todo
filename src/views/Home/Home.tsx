import React, {useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';

import './Home.css';
import {TodoList} from "../../containers/TodoList";
import {CreateTodoForm} from "../../containers/CreateTodoForm";
import {Pagination} from "../../containers/Pagination";
import {FilterFields, Filter} from "../../containers/Filter";
import {RootState} from "../../store";
import {createTaskRequest, getTodoListRequest, updateTaskRequest} from "../../modules/Todo/actionApi";
import { Switch, Route, useRouteMatch } from 'react-router-dom';
import {CreateTodoListTaskRequest, GetTodoListSortField, TodoListTask, GetTodoListSortDirection} from "../../api";
import {ProtectedRoute} from "../../index";
import { EditTodoTaskForm } from '../../containers/EditTodoTaskForm';

const sortTypeFields: Array<FilterFields<GetTodoListSortField>> = [
    {name: "Creation", value: "id"},
    {name: "Status", value: "status"},
    {name: "Username", value: "username"},
    {name: "Email", value: "email"},
];

const sortDirectionFields: Array<FilterFields<GetTodoListSortDirection>> = [
    {name: "Increase", value: "asc"},
    {name: "Decrease", value: "desc"},
];

export const Home: React.FC = ({ children }) => {
    const dispatch = useDispatch();
    const todoItems = useSelector(({ todo }: RootState) => todo.items);
    const { path } = useRouteMatch();

    useEffect(() => {
        dispatch(getTodoListRequest({ sort_field: "id", page: 1, sort_direction: "desc" }));
    }, []);

    const handleCreateTodo = (data: CreateTodoListTaskRequest) => {
        dispatch(createTaskRequest(data));
    };

    const handleUpdateTodo = (data: TodoListTask) => {
        dispatch(updateTaskRequest(data));
    };

    console.log('render App');
    return (
        <div className="todoapp">
            <Switch>
                <Route exact path={path}>
                    <header className="header">
                        <h1>todos</h1>
                        <CreateTodoForm onCreate={handleCreateTodo} />
                    </header>
                    <section className="main">
                        <TodoList todoItems={todoItems} />
                    </section>
                    <footer className="footer">
                        <Filter title={"Filter by"} fields={sortTypeFields} fieldName="sort_field" />
                        <Filter title={"Order by"} fields={sortDirectionFields} fieldName="sort_direction" />
                        <Pagination />
                    </footer>
                </Route>
                <ProtectedRoute path={`${path}/edit/:todoId`}>
                    <header className="header">
                        <h1>Edit todo</h1>
                        <EditTodoTaskForm onEdit={handleUpdateTodo} />
                    </header>
                </ProtectedRoute>
            </Switch>
        </div>
    );
};

export default Home;
