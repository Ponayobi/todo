import React from 'react';

import './Profile.css';
import {useDispatch} from "react-redux";
import {logout} from "../../modules/Auth/actions";
import {NavLink} from "react-router-dom";

export const Profile: React.FC = () => {
    const dispatch = useDispatch();

    const handleClick = () => {
        dispatch(logout());
    };

    console.log('render Profile');
    return (
        <div className="todoapp">
            <header className="header">
                <h1>Profile</h1>
                <div className="create-todo-form">
                    <div className="create-todo-form__field">
                        <NavLink
                            exact to="/login"
                            onClick={handleClick}
                            className="submit-btn"
                        >
                            Logout
                        </NavLink>
                    </div>
                </div>
            </header>
        </div>
    );
};

export default Profile;
