import React from 'react';
import PropTypes from 'prop-types';

const NavBar = (props) => {
    return (
        <div className={props.className}>
            Current user: {(props.currentUser ? props.currentUser.username : 'Anonymous')}
        </div>
    );
};

NavBar.propTypes = {
    currentUser: PropTypes.shape({
        id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
    }),
};

export {NavBar};