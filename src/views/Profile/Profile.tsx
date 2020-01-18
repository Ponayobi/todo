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
                <NavLink
                    exact to="/login"
                    onClick={handleClick}
                    activeStyle={{
                        textDecoration: 'none',
                        color: 'black'
                    }}
                >
                    Logout
                </NavLink>
            </header>
        </div>
    );
};

export default Profile;
