import React from 'react';
import PropTypes from 'prop-types';
import {Link} from 'App/Components/Common/Link/containers/Link';

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

export {Toast};