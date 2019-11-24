import React from 'react';
import { connect } from 'react-redux'
import store from "App/Redux/store";
import {Toasts as RepresentationalToasts} from "App/Components/Common/Toasts/components/Toasts"
import {closeToast} from "App/Redux/Common/Toasts/actions";

const mapStateToProps = (state) => {
    return {
        toasts: state.toasts
    };
};

const mapDispatchToProps = () => {
    return {
        onCloseToast: (toastId) => store.dispatch(closeToast(toastId))
    };
};

const Toasts = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToasts);

export default Toasts;