import React from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const Toast = (props) => {
    return (
        <div>
            TOAST: {props.message} ({props.type})
        </div>
    );
};
Toast.propTypes = {
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info']).isRequired,
};

const Toasts = (props) => {
    return (
        <div className={props.className}>
            {props.toasts.map((toastProps) => (<Toast {...toastProps} />))}
        </div>
    );
};
Toasts.propTypes = {
    className: PropTypes.string,
    toasts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => {
    return {
        toasts: state.toasts
    };
};
const mapDispatchToProps = (dispatch) => {
    return {};
};
const ConnectedToasts = connect(mapStateToProps, mapDispatchToProps)(Toasts);

export {ConnectedToasts};