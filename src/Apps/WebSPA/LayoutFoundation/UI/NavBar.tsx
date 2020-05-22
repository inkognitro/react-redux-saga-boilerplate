import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FunctionalLink } from "Packages/Common/Router/WebUI/Link";
import { RootState } from "Apps/WebSPA/_bootstrap/ServicesFactory";
import { findCurrentAuthUser } from "Packages/Common/Authentication/Domain/Query/CurrentAuthUserQuery";
import { AuthUser } from "Packages/Common/Authentication/Domain/Types";
import { createHomeRouteUrl, createLoginRouteUrl } from "Apps/WebSPA/Routing/HomePage/Domain";
import { Dispatch } from "redux";
import { createLogout } from "Packages/Common/Authentication/Domain/Command/Logout";
import { UserLabel } from "Entity/../../../Packages/Entity/User/UI/Web/User/UserLabel";

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
                        <UserLabel user={this.props.currentUser.user} />
                    </FunctionalLink>
                </li>
            );
        }
        return (
            <li className="nav-item"><NavLink className="nav-link" to={createLoginRouteUrl()}>Login</NavLink></li>
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

const mapDispatchToProps = (dispatch: Dispatch): RepresentationalNavBarCallbacks => ({
    onClickLogout: () => dispatch(createLogout()),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);
