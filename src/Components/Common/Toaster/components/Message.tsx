import React, {FunctionComponent} from 'react';
import {CloseIcon} from "App/Components/Common/Icons/CloseIcon";

export type MessageProps = {
    id: string,
    message: string,
};

export const Message: FunctionComponent<MessageProps> = (props) => {
    return (
        <div className="app-toast-message">
            {props.message}
            <CloseIcon />
        </div>
    );
};