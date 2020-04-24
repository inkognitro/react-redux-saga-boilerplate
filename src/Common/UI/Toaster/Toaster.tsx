import React, { FC } from "react";
import { Toast as ToastData } from "Common/Domain/Toaster/Types";
import styled from "styled-components";
import { Toast } from "Common/UI/Toaster/Toast";

const StyledToastsContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 0;
`;

export type ToasterComponentState = {
    toasts: ToastData[];
};

export type ToasterComponentCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterComponentState & ToasterComponentCallbacks;

export const Toaster: FC<ToasterProps> = (props) => {
    const { toasts } = props;
    return (
        <React.Fragment>
            <StyledToastsContainer>
                {toasts.map((toast: ToastData) => (
                    <Toast
                        key={toast.id}
                        toast={toast}
                        onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                    />
                ))}
            </StyledToastsContainer>
        </React.Fragment>
    );
};
