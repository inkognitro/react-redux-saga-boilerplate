import {MessageTypes} from "Common/ApiV1/Domain/Types";
import {ToastTypes} from "Common/Toaster/Domain/Types";

export function getToastTypeByMessageType (messageType: MessageTypes) {
    if(messageType === MessageTypes.ERROR) {
        return ToastTypes.ERROR
    }
    if(messageType === MessageTypes.SUCCESS) {
        return ToastTypes.SUCCESS
    }
    if(messageType === MessageTypes.WARNING) {
        return ToastTypes.WARNING
    }
    return ToastTypes.INFO;
}