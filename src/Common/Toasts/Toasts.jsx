import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'App/Common/Link/Link';

const Toast = (props) => {
    return (
        <div>
            Toast of type "{props.type}" with id "{props.id}" and message "{props.message}"
            <Link onClick={() => props.onClose(props.id)}>CLOSE</Link>
        </div>
    );
};
Toast.propTypes = {
    id: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    type: PropTypes.oneOf(['info']).isRequired,
    onClose: PropTypes.func.isRequired,
};

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