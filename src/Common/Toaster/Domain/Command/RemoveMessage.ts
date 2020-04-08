import {Command} from "Common/Bus/Domain/Command";
import {delay, put, select, takeEvery} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";
import {ToasterState, ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {findToastByMessageId} from "Common/Toaster/Domain/Query/ToastQuery";
import {getNonRemovingMessagesInToast} from "Common/Toaster/Domain/Query/MessageQuery";
import {createToastOutroAnimationWasStarted} from "Common/Toaster/Domain/Event/ToastOutroAnimationWasStarted";
import {createToastWasRemoved} from "Common/Toaster/Domain/Event/ToastWasRemoved";
import {createMessageOutroAnimationWasStarted} from "Common/Toaster/Domain/Event/MessageOutroAnimationWasStarted";
import {createMessageWasRemoved} from "Common/Toaster/Domain/Event/MessageWasRemoved";

export function createWatchRemoveMessageSaga(toasterStateSelector: ToasterStateSelector): GeneratorFunction {
    const handleRemoveMessage = function* (command: RemoveMessage): Generator {
        //@ts-ignore
        const toasterState: ToasterState = yield select(toasterStateSelector);
        const messageIdToRemove = command.payload.messageId;
        const toast = findToastByMessageId(toasterState, messageIdToRemove);
        if(!toast) {
            return;
        }
        const nonRemovingMessages = getNonRemovingMessagesInToast(toasterState, toast.id);
        if(nonRemovingMessages.length === 1) {
            if(nonRemovingMessages[0].id !== messageIdToRemove) {
                return;
            }
            yield put(createToastOutroAnimationWasStarted(toast.id));
            yield delay(800);
            yield put(createToastWasRemoved(toast.id));
            return;
        }
        yield put(createMessageOutroAnimationWasStarted(messageIdToRemove));
        yield delay(550);
        yield put(createMessageWasRemoved(messageIdToRemove));
    };

    return <GeneratorFunction>function* watchRemoveMessage(): Generator {
        yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage);
    }
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