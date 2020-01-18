import * as React from "react";
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
    return (
        <div>
            <NavLink
                exact to="/"
                activeStyle={{
                    textDecoration: 'none',
                    color: 'black'
                }}
            >
                Home
            </NavLink>
            <NavLink
                exact to="/profile"
                activeStyle={{
                    textDecoration: 'none',
                    color: 'black'
                }}
            >
                Profile
            </NavLink>
        </div>
    );
};
