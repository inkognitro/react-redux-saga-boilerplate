import React, { FunctionComponent } from 'react';
import {User} from 'App/Redux/Cache/UserRepository/types';
import {NavLink} from 'react-router-dom'
import {createHomeRouteUrl, createLoginRouteUrl} from 'App/Redux/Routing/routes';
import './NavBar.scss';

export type NavBarProps = {
    currentUser: (User | null),
};

function renderCurrentUserNavItem (props: NavBarProps) {
    if(!props.currentUser) {
        return;
    }
    return (
        <li className="nav-item">
            <span className="nav-link">
                {props.currentUser.username}
            </span>
        </li>
    );
}

export const NavBar: FunctionComponent<NavBarProps> = (props) => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <NavLink className="nav-link" to={createHomeRouteUrl()}>Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={createLoginRouteUrl()}>Login</NavLink>
            </li>
            {renderCurrentUserNavItem(props)}
        </ul>
    );
};