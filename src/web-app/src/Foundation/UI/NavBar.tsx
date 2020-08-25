import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { FunctionalLinkWC, RouteLinkWC } from "packages/common/Router/Web";
import { RootState } from "web-app/ServicesFactory";
import { Dispatch } from "redux";
import { getCurrentAuthUser } from "packages/common/Authentication/Domain";
import { AuthUser, AuthUserTypes } from "packages/entity/auth-user/domain";
import { createHomeRouteUrl, createLoginRouteUrl } from "web-app/Routing/Domain";
import { UserLabel } from "packages/entity/user/ui/web";
import { createLogout } from "../Domain";

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
                    <FunctionalLinkWC className="nav-link" onClick={() => this.props.onClickLogout()}>
                        <UserLabel user={this.props.currentUser.user} />
                        {' '}
                        :: Logout
                    </FunctionalLinkWC>
                </li>
            );
        }
        return (
            <li className="nav-item">
                <RouteLinkWC className="nav-link" url={createLoginRouteUrl()}>
                    Login
                </RouteLinkWC>
            </li>
        );
    }

    render(): ReactNode {
        return (
            <ul className="nav justify-content-center">
                <li className="nav-item">
                    <RouteLinkWC className="nav-link" url={createHomeRouteUrl()}>
                        Home
                    </RouteLinkWC>
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
