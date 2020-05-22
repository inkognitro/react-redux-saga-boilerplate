import React, { FC } from "react";
import { Toast } from "Packages/Common/Toaster/Domain/Types";
import styled from "styled-components";
import { ToastWC } from "Packages/Common/Toaster/UI/ToastWC";
import { TranslatorState } from "Packages/Common/Translator/Domain/Types";

const StyledToastsContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 0;
`;

export type ToasterWCState = {
    translatorState: TranslatorState
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
                    translatorState={props.translatorState}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </StyledToastsContainer>
    );
};
