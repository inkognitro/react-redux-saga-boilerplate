import React, { FC } from "react";
import styled from "styled-components";
import { Toast as ToastData } from "../../domain";
import { Toast } from "./toast";

const StyledToastsContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 0;
`;

export type ToasterState = {
    toasts: ToastData[]
};

export type ToasterCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterState & ToasterCallbacks;

export const Toaster: FC<ToasterProps> = (props) => {
    const { toasts } = props;
    return (
        <StyledToastsContainer>
            {toasts.map((toast: ToastData) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </StyledToastsContainer>
    );
};
