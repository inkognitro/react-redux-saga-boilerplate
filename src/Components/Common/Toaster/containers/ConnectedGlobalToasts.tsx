import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Toasts, ToastsProps} from 'App/Components/Common/Toaster/components/Toasts';
import {RootState} from "App/Redux/root";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: state.toaster.toasts
    };
};

const mapDispatchToProps = () => {
    return {
        onCloseToast: (toastId: string) => {
            console.log('Remove toast with id "' + toastId + '"');
        }
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalToastsProps = (PropsFromRedux & ToastsProps);
const GlobalToasts: FunctionComponent<GlobalToastsProps> = (props) => (<Toasts {...props} />);

export const ConnectedGlobalToasts = connector(GlobalToasts);