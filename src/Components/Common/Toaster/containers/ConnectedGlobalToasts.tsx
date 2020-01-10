import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Toasts, ToastsProps} from 'App/Components/Common/Toaster/components/Toasts';
import {RootState} from "App/Redux/root";
import {getToasts} from "App/Redux/Toaster/selectors";
import {removeToastMessage, removeToast, blockToastForMessageReceiving} from "App/Redux/Toaster/actions";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: getToasts(state)
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

export const ConnectedGlobalToasts = connector(GlobalToasts);