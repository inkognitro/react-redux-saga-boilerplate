import React from 'react';
import PropTypes from 'prop-types';

const Link = (props) => {
    return (
        <a
            href="#"
            onClick={(event) => {
                event.preventDefault();
                props.onClick();
            }}
        >
            {props.children}
        </a>
    );
};
Link.propTypes = {
    onClick: PropTypes.func.isRequired,
};

export {Link};