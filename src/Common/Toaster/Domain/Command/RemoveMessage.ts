import {Command} from "Common/Bootstrap/Command";
import {takeEvery} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";

function* handleRemoveMessage(_: RemoveMessage): Generator {

}

export function* watchRemoveMessage() {
    yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage);
}

export function createRemoveMessage(messageId: string): RemoveMessage {
    return {
        type: ToasterCommandTypes.REMOVE_MESSAGE,
        payload: {
            messageId: messageId
        },
    };
}

export type RemoveMessage = Command<ToasterCommandTypes.REMOVE_MESSAGE, {
    messageId: string,
}>;