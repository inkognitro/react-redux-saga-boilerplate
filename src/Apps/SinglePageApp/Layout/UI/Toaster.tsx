import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToasterCallbacks, ToasterState} from 'Common/Toaster/UI/Toaster';
import {Dispatch} from "redux";
import {RootState} from "SinglePageApp/Bootstrap/Store";
import {createRemoveMessage} from "Common/Toaster/Domain/Command/RemoveMessage";
import {getAllToasts} from "Common/Toaster/Domain/Query/ToastQuery";

const mapStateToProps = (rootState: RootState): ToasterState => {
    return {
        toasts: getAllToasts(rootState.toaster),
    };
};

const mapDispatchToProps = (dispatch: Dispatch): ToasterCallbacks => {
    return {
        onRemoveMessage: (messageId: string) => dispatch(createRemoveMessage(messageId)),
    };
};

export const Toaster = connect(mapStateToProps, mapDispatchToProps)(RepresentationalToaster);