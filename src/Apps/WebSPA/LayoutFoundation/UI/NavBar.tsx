import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { FunctionalLinkWC } from "Packages/Common/Router";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { Dispatch } from "redux";
import { AuthUser, createLogout, findCurrentAuthUser } from "Packages/Common/Authentication";
import { createHomeRouteUrl, createLoginRouteUrl } from "Apps/WebSPA/Routing";
import { UserLabelWC } from "Packages/Entity/User";

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
                    <FunctionalLinkWC className="nav-link" onClick={() => this.props.onClickLogout()}>
                        Logout
                        {' '}
                        <UserLabelWC user={this.props.currentUser.user} />
                    </FunctionalLinkWC>
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
