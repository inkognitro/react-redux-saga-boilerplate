import React, {FunctionComponent} from 'react';
import {Toast} from './Toast';
import {Toast as ToastData} from "Common/Domain/Toaster/Types";
import styled from "styled-components";

const StyledToastsContainer = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    height: 0;
`;

export type ToasterComponentState = {
    toasts: ToastData[],
}

export type ToasterComponentCallbacks = {
    onRemoveMessage(messageId: string): void,
};

export type ToasterProps = (ToasterComponentState & ToasterComponentCallbacks);

export const Toaster: FunctionComponent<ToasterProps> = (props) => {
    return (
        <StyledToastsContainer>
            {props.toasts.map((toast: ToastData) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </StyledToastsContainer>
    );
};