import {Command} from "Common/Bootstrap/Command";
import {takeEvery} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";
import {ToastTypes} from "Common/Toaster/Domain/Types";

function* handleShowMessage(_: ShowMessage): Generator {

}

export function* watchShowMessage() {
    yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage);
}

export function createShowMessage(settings: Payload): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessage = Command<ToasterCommandTypes.SHOW_MESSAGE, Payload>;

type Payload = {
    id?: string,
    toastType: ToastTypes,
    content: Node,
    automaticCloseDelayInMs?: number,
    mustBeShownInSeparateToast?: boolean,
};