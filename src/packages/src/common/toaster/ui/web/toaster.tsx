import React, { FC } from 'react';
import { useDispatch } from 'react-redux';
import styled from 'styled-components';
import { createRemoveMessage, Toast as ToastData } from '../../domain';
import { Toast } from './toast';

const StyledToastsContainer = styled.div`
    position: fixed;
    right: 0;
    top: 0;
    height: 0;
`;

export type ToasterProps = { toasts: ToastData[] };

export const Toaster: FC<ToasterProps> = (props) => {
    const dispatch = useDispatch();
    const { toasts } = props;
    return (
        <StyledToastsContainer>
            {toasts.map((toast: ToastData) => (
                <Toast
                    key={toast.id}
                    toast={toast}
                    onRemoveMessage={(messageId: string) => dispatch(createRemoveMessage(messageId))}
                />
            ))}
        </StyledToastsContainer>
    );
};
