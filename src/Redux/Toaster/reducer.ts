import {ToasterAction, ToasterState} from "./types";
import {ToastActionTypes} from "App/Redux/Toaster/Toast/types";

const initialToasterState: ToasterState = {
    toastMessagesToAdd: [],
    toasts: []
};

export function toaster (state: ToasterState = initialToasterState, action?: ToasterAction): ToasterState {
    if(!action) {
        return state;
    }

    if(action.type === ToastActionTypes.ADD_TOAST) {
        return Object.assign({}, state, {
            toasts: [
                action.payload.toast,
                ...state.toasts,
            ]
        });
    }

    return state;
}