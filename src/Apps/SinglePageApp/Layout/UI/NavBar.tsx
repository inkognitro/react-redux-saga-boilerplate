import React, {Component} from 'react'
import {connect} from 'react-redux'
import {NavLink} from 'react-router-dom'
import {FunctionalLink} from "Common/Layout/UI/Link/Link";
import {User} from "Common/Model/Domain/User";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {createHomeRouteUrl} from "SinglePageApp/Routing/Domain/Home/Home";

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
                <FunctionalLink onClick={() => this.props.onClickLogout()}>
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
                        <NavLink className="nav-link" to="foo">Login</NavLink>
                    </li>
                ))}
                {this.renderCurrentUserNavItem()}
            </ul>
        );
    }
}

const mapStateToProps = (_: RootState): RepresentationalNavBarState => {
    return {
        currentUser: null
    };
};

const mapDispatchToProps = ({}): RepresentationalNavBarCallbacks => {
    return {
        onClickLogout: (): void => console.log('logout'),
    };
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);