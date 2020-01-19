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
                >
                    Profile
                </NavLink>
            </li>
        </ul>
    );
};
