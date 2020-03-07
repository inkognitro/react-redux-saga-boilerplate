import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toaster';
import {Dispatch} from "redux";
import {createRemoveToastCommand} from "Common/Toaster/Domain/Command/RemoveToast";
import {getToasts} from "Common/Toaster/Domain/Query";
import {ToasterState} from "Common/Toaster/Domain/Types";
import {createToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";
import {createBlockToastForMessageReceivingCommand} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";

//todo: Replace object with new type RootState!

type ToasterStateByAppStateSelector = (rootState: object) => ToasterState;

const mapStateToProps = (rootState: object, props: {getToasterStateFromAppState: ToasterStateByAppStateSelector}): ToastsState => {
    return {
        toasts: getToasts(props.getToasterStateFromAppState(rootState)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToastCommand(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => dispatch(createToastMessageWasRemoved(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string) => dispatch(createBlockToastForMessageReceivingCommand(toastId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);