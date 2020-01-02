import React, {FunctionComponent} from 'react';
import {FunctionalLink} from 'App/Components/Common/Link/containers/Link';

export type MessageProps = {
    id: string,
    message: string,
};

export const Message: FunctionComponent<MessageProps> = (props) => {
    return (
        <div className="app-toast-message">
            {props.message}
            <FunctionalLink onClick={() => console.log('close message!')}>CLOSE</FunctionalLink>
        </div>
    );
};