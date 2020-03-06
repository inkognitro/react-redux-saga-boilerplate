import {Middleware} from 'redux';
import {handleAddToastMessageAction} from "Common/Toaster/Domain/Commands/AddToastMessage";
import {handleRemoveToastAction} from "Common/Toaster/Domain/Commands/RemoveToast";
import {handleBlockToastForMessageReceivingAction} from "Common/Toaster/Domain/Commands/BlockToastForMessageReceiving";
import {handleRemoveToastMessageAction} from "Common/Toaster/Domain/Commands/RemoveToastMessage";

export enum CommandActionTypes {
    ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST = 'REMOVE_TOAST-804a1c85-690e-468f-bde7-74a2864bc11c',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
}

export function createToasterMiddleware(): Middleware {
    return _ => next => action => {
        if (!action) {
            return;
        }

        if(action.type === CommandActionTypes.ADD_TOAST_MESSAGE) {
            handleAddToastMessageAction(action.payload, next);
        }

        if(action.type === CommandActionTypes.REMOVE_TOAST) {
            handleRemoveToastAction(action.payload.toastId, next);
        }

        if(action.type === CommandActionTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
            handleBlockToastForMessageReceivingAction(action.payload.toastId, next);
        }

        if(action.type === CommandActionTypes.REMOVE_TOAST_MESSAGE) {
            handleRemoveToastMessageAction(action.payload.toastId, action.payload.messageId, next);
        }

        return next(action);
    };
}