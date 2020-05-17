import { ToasterState, ToasterStateSelector } from "Packages/Common/Domain/Toaster/Types";
import { delay, put, select } from "redux-saga/effects";
import { findToastByMessageId } from "Packages/Common/Domain/Toaster/Query/ToastQuery";
import { getNonRemovingMessagesInToast } from "Packages/Common/Domain/Toaster/Query/MessageQuery";
import { RemoveMessage } from "Packages/Common/Domain/Toaster/Command/RemoveMessage";
import { createToastOutroAnimationWasStarted } from "Packages/Common/Domain/Toaster/Event/ToastOutroAnimationWasStarted";
import { createToastWasRemoved } from "Packages/Common/Domain/Toaster/Event/ToastWasRemoved";
import { createMessageOutroAnimationWasStarted } from "Packages/Common/Domain/Toaster/Event/MessageOutroAnimationWasStarted";
import { createMessageWasRemoved } from "Packages/Common/Domain/Toaster/Event/MessageWasRemoved";

export function* handleRemoveMessage(toasterStateSelector: ToasterStateSelector, command: RemoveMessage): Generator {
    // @ts-ignore
    const toasterState: ToasterState = yield select(toasterStateSelector);
    const messageIdToRemove = command.payload.messageId;
    const toast = findToastByMessageId(toasterState, messageIdToRemove);
    if (!toast) {
        return;
    }
    const nonRemovingMessages = getNonRemovingMessagesInToast(
        toasterState,
        toast.id,
    );
    if (nonRemovingMessages.length === 1) {
        if (nonRemovingMessages[0].id !== messageIdToRemove) {
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
}
