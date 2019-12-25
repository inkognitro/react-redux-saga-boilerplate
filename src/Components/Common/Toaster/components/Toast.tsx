import React, {FunctionComponent} from 'react';
import {FunctionalLink} from 'App/Components/Common/Link/containers/Link';

export type ToastProps = {
    id: string,
    message: string,
    type: 'info' | 'warning' | 'error',
    onClose(toastId: string): void,
};

export const Toast: FunctionComponent<ToastProps> = (props) => {
    return (
        <div>
            Toast of type "{props.type}" with id "{props.id}" and message "{props.message}"
            <FunctionalLink onClick={() => props.onClose(props.id)}>CLOSE</FunctionalLink>
        </div>
    );
};