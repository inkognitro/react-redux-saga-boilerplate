import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { FunctionalLinkWC, RouteLinkWC } from "Packages/Common/Router";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { Dispatch } from "redux";
import { AuthUserTypes, getCurrentAuthUser } from "Packages/Common/Authentication";
import { AuthUser } from "Packages/Entity/AuthUser";
import { createHomeRouteUrl, createLoginRouteUrl } from "Apps/WebSPA/Routing";
import { UserLabelWC } from "Packages/Entity/User";
import { createLogout } from "Apps/WebSPA/Foundation";

type RepresentationalNavBarState = {
  currentUser: AuthUser
};

type RepresentationalNavBarCallbacks = {
  onClickLogout(): void
};

type RepresentationalNavBarProps = (RepresentationalNavBarState & RepresentationalNavBarCallbacks);

class RepresentationalNavBar extends Component<RepresentationalNavBarProps> {
    renderAuthLink(): ReactNode {
        if (this.props.currentUser) {
            return (
                <li className="nav-item">
                    <FunctionalLinkWC className="nav-link" onClick={() => this.props.onClickLogout()}>
                        {(
                            this.props.currentUser.type === AuthUserTypes.AUTHENTICATED_USER
                                ? (<UserLabelWC user={this.props.currentUser.user} />)
                                : undefined
                        )}
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
