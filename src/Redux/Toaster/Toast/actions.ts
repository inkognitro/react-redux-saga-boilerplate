import {ADD_TOAST, ToasterActionType, toastType, Toast} from "./types";

function addToast(toast: Toast): ToasterActionType {
    return {
        type: ADD_TOAST,
        payload: {
            toast: toast,
        }
    }
}