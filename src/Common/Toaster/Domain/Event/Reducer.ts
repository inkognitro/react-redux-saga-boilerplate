import {ToasterEvent, ToasterState} from "Common/Toaster/Domain/Types";

const initialToasterState: ToasterState = {
    messagesToAdd: [],
    toasts: [],
};

export function toasterReducer(state: ToasterState = initialToasterState, event?: ToasterEvent): ToasterState {
    if (!event) {
        return state;
    }

    return state;
}