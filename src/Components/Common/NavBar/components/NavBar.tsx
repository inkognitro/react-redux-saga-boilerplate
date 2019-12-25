import React, { FunctionComponent } from 'react';
import {User} from 'App/Model/User';
import './NavBar.scss';

export type NavBarProps = {
    currentUser: (User | null)
}

export const NavBar: FunctionComponent<NavBarProps> = (props) => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <a className="nav-link active" href="#">Active</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link" href="#">Link</a>
            </li>
            <li className="nav-item">
                <a className="nav-link disabled" href="#">Disabled</a>
            </li>
            <li className="nav-item">
                <a className="nav-link">
                    CurrentUser :: {(props.currentUser ? props.currentUser.username : 'Anonymous')}
                </a>
            </li>
        </ul>
    );
};