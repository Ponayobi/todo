import React from 'react';

import './Auth.css';
import {LoginForm} from "../../containers/LoginForm";

export const Auth: React.FC = () => {
    console.log('render Auth');
    return (
        <div className="todoapp">
            <header className="header">
                <h1>Auth</h1>
                <LoginForm />
            </header>
        </div>
    );
};

export default Auth;
