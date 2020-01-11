import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {findCurrentUser, hasCurrentUserBeenInitialized} from "App/Common/Auth/Redux/Selectors";
import {logout} from "App/Common/Auth/Redux/Actions";
import {RootState} from "MainApp/App";
import {User} from 'App/Common/Cache/Redux/UserRepository/Types';
import {createHomeRouteUrl, createLoginRouteUrl} from 'App/MainApp/Routing/RouteFactory';
import {FunctionalLink} from "Common/Layout/Components/Link/Link";
import './NavBar.scss';

export type RepresentationalNavBarProps = {
    currentUser: (User | null),
    onClickLogout(): void,
};

function renderCurrentUserNavItem (props: RepresentationalNavBarProps) {
    if(!props.currentUser) {
        return;
    }
    return (
        <li className="nav-item">
            <FunctionalLink onClick={() => props.onClickLogout()} className="nav-link">
                Logout {props.currentUser.username}
            </FunctionalLink>
        </li>
    );
}

export const RepresentationalNavBar: FunctionComponent<RepresentationalNavBarProps> = (props) => {
    return (
        <ul className="nav justify-content-center">
            <li className="nav-item">
                <NavLink className="nav-link" to={createHomeRouteUrl()}>Home</NavLink>
            </li>
            <li className="nav-item">
                <NavLink className="nav-link" to={createLoginRouteUrl()}>Login</NavLink>
            </li>
            {renderCurrentUserNavItem(props)}
        </ul>
    );
};

const mapStateToProps = (state: RootState) => {
    return {
        hasCurrentUserBeenInitialized: hasCurrentUserBeenInitialized(state.auth),
        currentUser: findCurrentUser(state.auth, state.cache.userRepository),
    };
};

//@ts-ignore
const mapDispatchToProps = (dispatch) => { //todo: type hinting!
    return {
        onClickLogout: () => dispatch(logout()),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalNavBarProps = (PropsFromRedux & RepresentationalNavBarProps);
const GlobalNavBar: FunctionComponent<GlobalNavBarProps> = (props) => (<RepresentationalNavBar {...props} />);

export const NavBar = connector(GlobalNavBar);