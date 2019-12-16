import React, { FunctionComponent } from 'react';
import {User} from 'App/Model/User';

export type NavBarProps = {
    currentUser: (User | null)
}

export const NavBar: FunctionComponent<NavBarProps> = (props) => {
    return (
        <div className="container">
            <div className="row">
                <div className="col-sm">
                    Current user: {(props.currentUser ? props.currentUser.username : 'Anonymous')}
                </div>
            </div>
        </div>
    );
};