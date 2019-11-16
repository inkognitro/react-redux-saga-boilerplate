import React from 'react';
import { connect } from 'react-redux'
import {Toasts as RepresentationalToasts} from '../components/Toasts';

const mapStateToProps = (state) => {
    return {
        toasts: state.toasts
    };
};

const mapDispatchToProps = () => {
    return {
        //onCloseToast: (toastId) => dispatch() //todo: add remove toast function (and fade out functions!)
    };
};

const Toasts = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToasts);

export {Toasts};