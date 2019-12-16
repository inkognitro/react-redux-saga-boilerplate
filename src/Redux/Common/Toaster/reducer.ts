import {ADD_MESSAGE_TO_TOAST, ADD_TOAST_MESSAGE_TO_PIPELINE, ToasterActionType, ToasterState} from "./types";

const initialToasterState: ToasterState = {
    messagesInPipeline: [],
    toasts: []
};

export function toaster (state: ToasterState = initialToasterState, action?: ToasterActionType): ToasterState {
    if(!action) {
        return state;
    }

    if(action.type === ADD_TOAST_MESSAGE_TO_PIPELINE) {
        return Object.assign({}, state, {
            messagesInPipeline: [
                ...state.messagesInPipeline,
                action.payload.message,
            ]
        });
    }

    if(action.type === ADD_MESSAGE_TO_TOAST) {
        return Object.assign({}, state, {
            messagesInPipeline: state.messagesInPipeline.filter(
                (message) => (message.id !== action.payload.message.id)
            ),
            toasts: [
                ...state.toasts,
                action.payload.message,
            ]
        });
    }

    return state;
}