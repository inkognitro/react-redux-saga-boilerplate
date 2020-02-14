import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Toasts, ToastsProps} from 'Common/Toaster/Application/UI/Toasts';
import {getToasts} from "Common/Toaster/Domain/Selectors";
import {createRemoveToastMessageAction, createRemoveToastThunk, createBlockToastForMessageReceivingAction} from "Common/Toaster/Domain/Actions";
import {RootState} from "SinglePageApp/App";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: getToasts(state.toaster)
    };
};

//@ts-ignore
const mapDispatchToProps = (dispatch) => { //todo: add correct type hint
    return {
        onRemoveToast: (toastId: string): void => dispatch(createRemoveToastThunk(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string): void => dispatch(createRemoveToastMessageAction(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string): void => dispatch(createBlockToastForMessageReceivingAction(toastId)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalToastsProps = (PropsFromRedux & ToastsProps);
const GlobalToasts: FunctionComponent<GlobalToastsProps> = (props) => (<Toasts {...props} />);

export const Toaster = connector(GlobalToasts);