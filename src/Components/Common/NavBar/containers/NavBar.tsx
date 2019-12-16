import { connect } from 'react-redux'
import {NavBar as RepresentationalNavBar} from "../components/NavBar"
import {RootState} from "App/Redux/root";

const mapStateToProps = (state: RootState) => {
    return {
        currentUser: state.auth.user,
    };
};

const mapDispatchToProps = () => {
    return {};
};

export const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);