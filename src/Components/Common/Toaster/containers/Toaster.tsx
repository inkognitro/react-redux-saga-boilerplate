import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster} from "App/Components/Common/Toaster/components/Toaster"
import {RootState} from "App/Redux/root";

const mapStateToProps = (state: RootState) => {
    return {
        toasts: state.toaster.toasts
    };
};

const mapDispatchToProps = () => {
    return {
        onCloseToast: (toastId: string) => console.log('todo!')
    };
};

const Toasts = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);

export default Toasts;