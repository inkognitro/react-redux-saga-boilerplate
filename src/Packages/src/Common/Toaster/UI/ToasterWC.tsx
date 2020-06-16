import React, { FC } from "react";
import styled from "styled-components";
import { Toast } from "../Domain/Types";
import { ToastWC } from "./ToastWC";

const StyledToastsContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 0;
`;

export type ToasterWCState = {
    toasts: Toast[]
};

export type ToasterWCCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterWCState & ToasterWCCallbacks;

export const ToasterWC: FC<ToasterProps> = (props) => {
    const { toasts } = props;
    return (
        <StyledToastsContainer>
            {toasts.map((toast: Toast) => (
                <ToastWC
                    key={toast.id}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </StyledToastsContainer>
    );
};
