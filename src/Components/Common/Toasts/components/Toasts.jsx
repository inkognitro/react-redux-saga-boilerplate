import React from 'react';
import PropTypes from 'prop-types';
import {Toast} from './Toast';

const Toasts = (props) => {
    return (
        <div className={props.className}>
            {props.toasts.map((toastProps) => (
                <Toast
                    key={toastProps.id}
                    onClose={(toastId) => props.onCloseToast(toastId)}
                    {...toastProps}
                />
            ))}
        </div>
    );
};

Toasts.propTypes = {
    className: PropTypes.string,
    toasts: PropTypes.array.isRequired,
    onCloseToast: PropTypes.func.isRequired,
};

export {Toasts};