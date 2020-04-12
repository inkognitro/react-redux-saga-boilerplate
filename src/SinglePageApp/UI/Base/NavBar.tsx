import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {FunctionalLink} from "Common/UI/Base/Link/Link";
import {RootState} from "SinglePageApp/Bootstrap/ServicesFactory";
import {createHomeRouteUrl} from "../../Domain/Routing/Home/Home";
import {findCurrentAuthUser} from "Common/Domain/Authentication/Query/CurrentAuthUserQuery";
import {AuthUser} from "Common/Domain/Authentication/Types";

type RepresentationalNavBarState = {
    currentUser: (AuthUser | null),
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
                <FunctionalLink className="nav-link" onClick={() => this.props.onClickLogout()}>
                    Logout {this.props.currentUser.user.username}
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
                        <NavLink className="nav-link" to="foo">Login</NavLink>
                    </li>
                ))}
                {this.renderCurrentUserNavItem()}
            </ul>
        );
    }
}

const mapStateToProps = (state: RootState): RepresentationalNavBarState => {
    return {
        currentUser: findCurrentAuthUser(state.authentication)
    };
};

const mapDispatchToProps = ({}): RepresentationalNavBarCallbacks => {
    return {
        onClickLogout: (): void => console.log('logout'),
    };
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);