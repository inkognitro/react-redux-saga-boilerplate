import React from 'react';
import PropTypes from 'prop-types';
import {store} from 'App/AppRedux';
import {ConnectedToasts} from 'App/Common/Toasts/Toasts';

const Content = (props) => {
    return (
        <div>
            {props.children}
            <ConnectedToasts toasts={store.getState().toasts}/>
        </div>
    );
};
Content.propTypes = {
    className: PropTypes.string,
};

export {Content};