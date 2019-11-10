import React from 'react';
import { connect } from 'react-redux'
import {Toasts} from './Toasts';

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
const ConnectedToasts = connect(mapStateToProps, mapDispatchToProps)(Toasts);

export {ConnectedToasts};