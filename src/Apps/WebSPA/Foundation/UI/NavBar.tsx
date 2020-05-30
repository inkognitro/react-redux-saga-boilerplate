import React, { Component, ReactNode } from "react";
import { connect } from "react-redux";
import { FunctionalLinkWC, RouteLinkWC } from "Packages/Common/Router";
import { RootState } from "Apps/WebSPA/Bootstrap/ServicesFactory";
import { Dispatch } from "redux";
import { AuthUser, findCurrentAuthUser } from "Packages/Common/Authentication";
import { createHomeRouteUrl, createLoginRouteUrl } from "Apps/WebSPA/Routing";
import { UserLabelWC } from "Packages/Entity/User";
import { createLogout } from "Apps/WebSPA/Foundation";

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
                        <UserLabelWC user={this.props.currentUser.user} />
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
    currentUser: findCurrentAuthUser(state.authentication),
});

const mapDispatchToProps = (dispatch: Dispatch): RepresentationalNavBarCallbacks => ({
    onClickLogout: () => dispatch(createLogout()),
});

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);
