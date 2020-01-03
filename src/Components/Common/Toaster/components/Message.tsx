import React, {FunctionComponent} from 'react';
import {CloseIcon} from "App/Components/Common/Icons/CloseIcon";
import {IconSizes, IconTypes} from "App/Components/Common/Icons/types";

export type MessageProps = {
    id: string,
    message: string,
};

export const Message: FunctionComponent<MessageProps> = (props) => {
    return (
        <div className="app-toast-message">
            {props.message}
            <CloseIcon
                onClick={() => console.log('close')}
                type={IconTypes.SECONDARY}
                size={IconSizes.SM}
                className="app-toast-message-close-icon"
            />
        </div>
    );
};