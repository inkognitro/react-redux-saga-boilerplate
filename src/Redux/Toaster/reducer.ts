import {ToasterAction, ToasterState} from "./types";
import {ToastActionTypes, ToastTypes} from "App/Redux/Toaster/Toast/types";

const initialToasterState: ToasterState = {
    toastMessagesToAdd: [],
    toasts: [ //todo: replace with empty array!
        {
            id: 'ec95fea8-85d5-4dc6-ae7f-17e5b0f79488',
            type: ToastTypes.SUCCESS,
            isAnimationRunning: false,
            isVisible: true,
            messages: [
                {
                    id: '482cd02e-a6cf-4086-81b8-214f53481598',
                    isAnimationRunning: false,
                    isVisible: true,
                    message: 'foo!'
                },
                {
                    id: '582cd02e-a6cf-4086-81b8-214f53481598',
                    isAnimationRunning: false,
                    isVisible: true,
                    message: 'bar!'
                }
            ]
        },
    ]
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