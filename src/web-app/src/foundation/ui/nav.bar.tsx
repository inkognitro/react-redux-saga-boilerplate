import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { FunctionalLink, RouteLink } from "packages/common/router/ui/web";
import { RootState } from "web-app/services.factory";
import { Dispatch } from "redux";
import { getCurrentAuthUser } from "packages/common/authentication/domain";
import { AuthUser, AuthUserTypes } from "packages/entity/auth-user/domain";
import { createHomeRouteUrl, createLoginRouteUrl } from "web-app/routing/domain";
import { UserLabel } from "packages/entity/user/ui/web";
import { createLogout } from "../domain";

type RepresentationalNavBarState = {
  currentUser: AuthUser
};

type RepresentationalNavBarCallbacks = {
  onClickLogout(): void
};

type RepresentationalNavBarProps = (RepresentationalNavBarState & RepresentationalNavBarCallbacks);

class RepresentationalNavBar extends Component<RepresentationalNavBarProps> {
    renderAuthLink(): ReactNode {
        if (this.props.currentUser.type === AuthUserTypes.AUTHENTICATED_USER) {
            return (
                <li className="nav-item">
                    <FunctionalLink className="nav-link" onClick={() => this.props.onClickLogout()}>
                        <UserLabel user={this.props.currentUser.user} />
                        {' '}
                        :: Logout
                    </FunctionalLink>
                </li>
            );
        }
        return (
            <li className="nav-item">
                <RouteLink className="nav-link" url={createLoginRouteUrl()}>
                    Login
                </RouteLink>
            </li>
        );
    }

    render(): ReactNode {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <RouteLink className="nav-link" url={createHomeRouteUrl()}>
                        Home
                    </RouteLink>
                </li>
                {this.renderAuthLink()}
            </ul>
        );
    }
}

const mapStateToProps = (state: RootState): RepresentationalNavBarState => ({
    currentUser: getCurrentAuthUser(state.authentication),
});

const mapDispatchToProps = (dispatch: Dispatch): RepresentationalNavBarCallbacks => ({
    onClickLogout: () => dispatch(createLogout()),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);
