import {ToasterActionType, ToasterState} from "./types";
import {ADD_TOAST} from "App/Redux/Toaster/Toast/types";

const initialToasterState: ToasterState = {
    toastMessagesToAdd: [],
    toasts: []
};

export function toaster (state: ToasterState = initialToasterState, action?: ToasterActionType): ToasterState {
    if(!action) {
        return state;
    }

    if(action.type === ADD_TOAST) {
        return Object.assign({}, state, {
            toasts: [
                action.payload.toast,
                ...state.toasts,
            ]
        });
    }

    return state;
}