import React from 'react';
import PropTypes from 'prop-types';
import Toasts from 'App/Components/Common/Toasts/containers/Toasts';
import NavBar from "App/Components/Common/NavBar/containers/NavBar";

const ContentPage = (props) => {
    return (
        <div className={props.className}>
            <NavBar />
            <div>
                {props.children}
            </div>
            <Toasts />
        </div>
    );
};

ContentPage.propTypes = {
    className: PropTypes.string,
};

export default ContentPage;