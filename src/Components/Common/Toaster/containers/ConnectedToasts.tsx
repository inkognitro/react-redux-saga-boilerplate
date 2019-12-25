import { connect } from 'react-redux'
import {Toasts} from 'App/Components/Common/Toaster/components/Toasts';
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

export const ConnectedToasts = connect(mapStateToProps, mapDispatchToProps)(Toasts);