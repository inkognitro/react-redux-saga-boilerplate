import React, { FunctionComponent } from 'react'
import { connect, ConnectedProps } from 'react-redux'
import {Toasts, ToastsProps} from 'App/Components/Common/Toaster/components/Toasts';
import {RootState} from "App/Redux/root";
import {getToasts} from "App/Redux/Toaster/selectors";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: getToasts(state)
    };
};

const mapDispatchToProps = () => {
    return {
        /*
        onRemoveToast: (toastId: string) => {
            console.log('Remove toast with id "' + toastId + '"');
        }
        */
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);
type PropsFromRedux = ConnectedProps<typeof connector>;

type GlobalToastsProps = (PropsFromRedux & ToastsProps);
const GlobalToasts: FunctionComponent<GlobalToastsProps> = (props) => (<Toasts {...props} />);

export const ConnectedGlobalToasts = connector(GlobalToasts);