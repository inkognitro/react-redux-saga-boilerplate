import React, {Component, createRef, RefObject} from 'react';
import {CloseIcon} from "App/Components/Common/Icons/CloseIcon";
import {IconSizes, IconTypes} from "App/Components/Common/Icons/types";

export type MessageProps = {
    id: string,
    content: string,
};

export class Message extends Component<MessageProps> {
    private messageElement: RefObject<HTMLDivElement>;

    constructor(props: MessageProps) {
        super(props);
        this.messageElement = createRef();
    }

    render() {
        return (
            <div ref={this.messageElement} className="app-toast-message">
                {this.props.content}
                <CloseIcon
                    onClick={() => console.log('close')}
                    type={IconTypes.SECONDARY}
                    size={IconSizes.SM}
                    className="app-toast-message-close-icon"
                />
            </div>
        );
    }
}