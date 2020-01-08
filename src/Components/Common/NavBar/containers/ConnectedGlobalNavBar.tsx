import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {NavBar as RepresentationalNavBar, NavBarProps as RepresentationalNavBarProps} from "../components/NavBar"
import {RootState} from "App/Redux/root";
import {findCurrentUser, hasCurrentUserBeenInitialized} from "App/Redux/Auth/selectors";
import {logout} from "App/Redux/Auth/actions";

const mapStateToProps = (state: RootState) => {
    return {
        hasCurrentUserBeenInitialized: hasCurrentUserBeenInitialized(state),
        currentUser: findCurrentUser(state),
    };
};

const mapDispatchToProps = (dispatch) => { //todo: type hinting!
    return {
        onClickLogout: () => dispatch(logout()),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalNavBarProps = (PropsFromRedux & RepresentationalNavBarProps);
const GlobalNavBar: FunctionComponent<GlobalNavBarProps> = (props) => (<RepresentationalNavBar {...props} />);

export const ConnectedGlobalNavBar = connector(GlobalNavBar);