import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {NavBar as RepresentationalNavBar, NavBarProps as RepresentationalNavBarProps} from "../components/NavBar"
import {RootState} from "App/Redux/root";

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.auth.user,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalNavBarProps = (PropsFromRedux & RepresentationalNavBarProps);
const GlobalNavBar: FunctionComponent<GlobalNavBarProps> = (props) => (<RepresentationalNavBar {...props} />);

export const ConnectedGlobalNavBar = connector(GlobalNavBar);