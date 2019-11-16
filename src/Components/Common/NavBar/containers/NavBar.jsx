import React from 'react';
import { connect } from 'react-redux'
import RepresentationalNavBar from "../components/NavBar"

const mapStateToProps = (state) => {
    return {
        currentUser: state.auth.user,
    };
};

const mapDispatchToProps = () => {
    return {};
};

const NavBar = connect(mapStateToProps, mapDispatchToProps)(RepresentationalNavBar);

export default NavBar;