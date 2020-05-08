import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FunctionalLink } from "Common/UI/Base/Link";
import { RootState } from "SinglePageApp/Bootstrap/ServicesFactory";
import { findCurrentAuthUser } from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import { AuthUser } from "Common/Domain/Authentication/Types";
import {createHomeRouteUrl} from "SinglePageApp/Domain/Routing/Routes";

type RepresentationalNavBarState = {
  currentUser: AuthUser | null;
};

type RepresentationalNavBarCallbacks = {
  onClickLogout(): void;
};

type RepresentationalNavBarProps = (RepresentationalNavBarState & RepresentationalNavBarCallbacks);

class RepresentationalNavBar extends Component<RepresentationalNavBarProps> {
    renderAuthLink(): ReactNode {
        if (this.props.currentUser) {
            return (
                <li className="nav-item">
                    <FunctionalLink className="nav-link" onClick={() => this.props.onClickLogout()}>
                        Logout
                        {' '}
                        {this.props.currentUser.user.username}
                    </FunctionalLink>
                </li>
            );
        }
        return (
            <li className="nav-item"><NavLink className="nav-link" to="foo">Login</NavLink></li>
        );
    }

    render(): ReactNode {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <NavLink className="nav-link" to={createHomeRouteUrl()}>Home</NavLink>
                </li>
                {this.renderAuthLink()}
            </ul>
        );
    }
}

const mapStateToProps = (state: RootState): RepresentationalNavBarState => ({
    currentUser: findCurrentAuthUser(state.authentication),
});

const mapDispatchToProps = (): RepresentationalNavBarCallbacks => ({
    onClickLogout: (): void => console.log("logout"),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);
