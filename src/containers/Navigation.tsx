import * as React from "react";
import { NavLink } from 'react-router-dom';

export const Navigation: React.FC = () => {
    return (
        <ul className="filters">
            <li>
                <NavLink
                    exact to="/"
                    activeStyle={{
                        textDecoration: 'none',
                        color: 'black'
                    }}
                    className="link-btn clickable"
                >
                    Home
                </NavLink>
            </li>
            <li>
                <NavLink
                    exact to="/profile"
                    activeStyle={{
                        textDecoration: 'none',
                        color: 'black'
                    }}
                    className="link-btn clickable"
                >
                    Profile
                </NavLink>
            </li>
        </ul>
    );
};
