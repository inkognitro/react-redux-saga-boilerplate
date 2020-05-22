import React, { FC } from "react";
import { Toast as ToastData } from "Packages/Common/Toaster/Domain/Types";
import styled from "styled-components";
import { Toast } from "Packages/Common/Toaster/WebUI/Toast";
import { TranslatorState } from "Packages/Common/Translator/Domain/Types";

const StyledToastsContainer = styled.div`
  position: fixed;
  right: 0;
  top: 0;
  height: 0;
`;

export type ToasterComponentState = {
    translatorState: TranslatorState
    toasts: ToastData[]
};

export type ToasterComponentCallbacks = {
    onRemoveMessage(messageId: string): void;
};

export type ToasterProps = ToasterComponentState & ToasterComponentCallbacks;

export const Toaster: FC<ToasterProps> = (props) => {
    const { toasts } = props;
    return (
        <StyledToastsContainer>
            {toasts.map((toast: ToastData) => (
                <Toast
                    key={toast.id}
                    translatorState={props.translatorState}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => props.onRemoveMessage(messageId)}
                />
            ))}
        </StyledToastsContainer>
    );
};
