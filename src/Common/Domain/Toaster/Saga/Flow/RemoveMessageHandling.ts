import {
    ToasterCommandTypes,
    ToasterState,
    ToasterStateSelector,
} from "Common/Domain/Toaster/Types";
import {
    delay, put, select, takeEvery,
} from "@redux-saga/core/effects";
import { findToastByMessageId } from "Common/Domain/Toaster/Query/ToastQuery";
import { getNonRemovingMessagesInToast } from "Common/Domain/Toaster/Query/MessageQuery";
import { createToastOutroAnimationWasStarted } from "Common/Domain/Toaster/Event/ToastOutroAnimationWasStarted";
import { createToastWasRemoved } from "Common/Domain/Toaster/Event/ToastWasRemoved";
import { createMessageOutroAnimationWasStarted } from "Common/Domain/Toaster/Event/MessageOutroAnimationWasStarted";
import { createMessageWasRemoved } from "Common/Domain/Toaster/Event/MessageWasRemoved";
import { RemoveMessage } from "Common/Domain/Toaster/Command/RemoveMessage";

export function createWatchRemoveMessageFlow(
    toasterStateSelector: ToasterStateSelector,
): GeneratorFunction {
    const handleRemoveMessage = function* (command: RemoveMessage): Generator {
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
    };

    return <GeneratorFunction> function* (): Generator {
        yield takeEvery(ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage);
    };
}
