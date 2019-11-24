import React, { FunctionComponent } from 'react';
import User from 'App/Model/User';

export type NavBarProps = {
    currentUser: User
}

export const NavBar: FunctionComponent<NavBarProps> = (props) => {
    return (
        <div>
            Current user: {(props.currentUser ? props.currentUser.username : 'Anonymous')}
        </div>
    );
};