import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Toasts, ToastsProps} from 'Common/Application/Layout/Components/Toaster/Toasts';
import {getToasts} from "Common/Application/Layout/Redux/Toaster/Selectors";
import {removeToastMessage, removeToast, blockToastForMessageReceiving} from "Common/Application/Layout/Redux/Toaster/Actions";
import {RootState} from "SinglePageApp/App";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: getToasts(state.toaster)
    };
};

//@ts-ignore
const mapDispatchToProps = (dispatch) => { //todo: add correct type hint
    return {
        onRemoveToast: (toastId: string): void => dispatch(removeToast(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string): void => dispatch(removeToastMessage(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string): void => dispatch(blockToastForMessageReceiving(toastId)),
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalToastsProps = (PropsFromRedux & ToastsProps);
const GlobalToasts: FunctionComponent<GlobalToastsProps> = (props) => (<Toasts {...props} />);

export const Toaster = connector(GlobalToasts);