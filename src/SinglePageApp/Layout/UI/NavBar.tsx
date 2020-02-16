import React, { FunctionComponent } from 'react'
import {connect, ConnectedProps } from 'react-redux'
import {NavLink} from 'react-router-dom'
import {createHomeRouteUrl, createLoginRouteUrl} from 'SinglePageApp/Routing/Domain/RouteCreation';
import {FunctionalLink} from "Common/Layout/UI/Link/Link";
import './NavBar.scss';
import {User} from "Common/EntityCache/Domain/User/UserRepository";

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

const mapStateToProps = () => {
    return {
        currentUser: null,
    };
};

//@ts-ignore
const mapDispatchToProps = () => {
    return {
        onClickLogout: () => console.log('logout'),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalNavBarProps = (PropsFromRedux & RepresentationalNavBarProps);
const GlobalNavBar: FunctionComponent<GlobalNavBarProps> = (props) => (<RepresentationalNavBar {...props} />);

export const NavBar = connector(GlobalNavBar);