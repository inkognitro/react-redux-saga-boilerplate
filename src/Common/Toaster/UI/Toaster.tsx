import { connect } from 'react-redux'
import {Toasts, ToastsCallbacks, ToastsState} from 'Common/Toaster/UI/Toasts';
import {Dispatch} from "redux";
import {createRemoveToastAction} from "Common/Toaster/Application/Command/RemoveToast";
import {getToasts} from "Common/Toaster/Application/Query";
import {ToasterState} from "Common/Toaster/Domain/Types";
import {createRemoveToastMessageAction} from "Common/Toaster/Domain/Actions/RemoveToastMessageAction";
import {createBlockToastForMessageReceivingAction} from "Common/Toaster/Application/Command/BlockToastForMessageReceiving";

type ToasterStateByRootStateSelector = (rootState: object) => ToasterState; //todo: solve with generics!

const mapStateToProps = (rootState: object, props: {getToasterStateFromRootState: ToasterStateByRootStateSelector}): ToastsState => {
    return {
        toasts: getToasts(props.getToasterStateFromRootState(rootState)),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToastsCallbacks => {
    return {
        onRemoveToast: (toastId: string) => dispatch(createRemoveToastAction(toastId)),
        onRemoveToastMessage: (toastId: string, toastMessageId: string) => dispatch(createRemoveToastMessageAction(toastId, toastMessageId)),
        onBlockToastForMessageReceiving: (toastId: string) => dispatch(createBlockToastForMessageReceivingAction(toastId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(Toasts);