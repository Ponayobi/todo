import * as React from 'react';
import { Switch, Route } from 'react-router-dom';
import { ProtectedRoute } from "../../index";

import './Home.css';
import { CreateTodoForm } from "../../containers/CreateTodoForm";
import { TodoList } from "../../containers/TodoList";
import { FilterTypes } from "../../containers/FilterTypes";
import { FilterDirections } from "../../containers/FilterDirections";
import { Pagination } from "../../containers/Pagination";
import { EditTodoForm } from '../../containers/EditTodoForm';

export const Home: React.FC = React.memo(() => {
    console.log('render App');
    return (
        <div className="todoapp">
            <Switch>
                <Route exact path="/home">
                    <header className="header">
                        <h1>todos</h1>
                        <CreateTodoForm />
                    </header>
                    <section className="main">
                        <TodoList />
                    </section>
                    <footer className="footer">
                        <FilterTypes />
                        <FilterDirections />
                        <Pagination />
                    </footer>
                </Route>
                <ProtectedRoute path={`/home/edit/:todoId`}>
                    <header className="header">
                        <h1>Edit todo</h1>
                        <EditTodoForm />
                    </header>
                </ProtectedRoute>
            </Switch>
        </div>
    );
});

export default Home;
