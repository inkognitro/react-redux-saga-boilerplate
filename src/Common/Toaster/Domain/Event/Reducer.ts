import {ToasterEvent, ToasterEventTypes, ToasterState} from "Common/Toaster/Domain/Types";

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: [],
};

export function toasterReducer(state: ToasterState = initialToasterState, event?: ToasterEvent): ToasterState {
    if (!event) {
        return state;
    }

    if (event.type === ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE) {
        return Object.assign({}, state, {
            messagesToAdd: [
                ...state.messagesToAdd,
                event.payload.messageToAdd
            ],
        });
    }

    return state;
}