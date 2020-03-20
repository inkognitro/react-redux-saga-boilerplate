import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {createHomeRouteUrl, createLoginRouteUrl} from '../../Routing/Domain/Routes';
import {FunctionalLink} from "Common/Layout/UI/Link/Link";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {User} from "Common/EntityCache/Domain/User/Types";

type RepresentationalNavBarState = {
    currentUser: (User | null),
};

type RepresentationalNavBarCallbacks = {
    onClickLogout(): void,
};

type RepresentationalNavBarProps = (RepresentationalNavBarState & RepresentationalNavBarCallbacks);

class RepresentationalNavBar extends Component<RepresentationalNavBarProps> {
    renderCurrentUserNavItem () {
        if(!this.props.currentUser) {
            return;
        }
        return (
            <li className="nav-item">
                <FunctionalLink onClick={() => this.props.onClickLogout()} className="nav-link">
                    Logout {this.props.currentUser.username}
                </FunctionalLink>
            </li>
        );
    }

    render() {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link" to={createHomeRouteUrl()}>Home</NavLink>
                </li>
                {(this.props.currentUser ? null : (
                    <li className="nav-item">
                        <NavLink className="nav-link" to={createLoginRouteUrl()}>Login</NavLink>
                    </li>
                ))}
                {this.renderCurrentUserNavItem()}
            </ul>
        );
    }
}

const mapStateToProps = ({}, props: NavBarProps): RepresentationalNavBarState => {
    return {
        currentUser: props.authManager.findCurrentUser(),
    };
};

const mapDispatchToProps = ({}, props: NavBarProps): RepresentationalNavBarCallbacks => {
    return {
        onClickLogout: (): void => props.authManager.logoutCurrentUser(),
    };
};

type NavBarProps = {
    authManager: AuthManagerInterface,
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);