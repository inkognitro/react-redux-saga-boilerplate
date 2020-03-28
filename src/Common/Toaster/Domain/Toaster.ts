import {all} from 'redux-saga/effects'
import {watchAddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";
import {watchRemoveToast} from "Common/Toaster/Domain/Command/RemoveToast";
import {watchBlockToastForMessageReceiving} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {watchRemoveToastMessage} from "Common/Toaster/Domain/Command/RemoveToastMessage";

export function* toasterSaga() {
    yield all([
        watchAddToastMessage(),
        watchRemoveToast(),
        watchBlockToastForMessageReceiving(),
        watchRemoveToastMessage(),
    ])
}

export enum CommandTypes {
    ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST = 'REMOVE_TOAST-804a1c85-690e-468f-bde7-74a2864bc11c',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
}