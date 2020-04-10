import { connect } from 'react-redux'
import {Toaster as RepresentationalToaster, ToasterCallbacks, ToasterState} from 'Common/UI/Toaster/Toaster';
import {Dispatch} from "redux";
import {RootState} from "../../ServicesFactory";
import {createRemoveMessage} from "Common/Domain/Toaster/Command/RemoveMessage";
import {getAllToasts} from "Common/Domain/Toaster/Query/ToastQuery";

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