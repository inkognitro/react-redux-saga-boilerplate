import uuidV4 from "uuid/v4";
import {
    delay, fork, put, select, spawn,
} from "redux-saga/effects";
import {
    Message,
    Toast,
    ToasterSettings,
    ToasterState,
    ToasterStateSelector,
} from "../../Types";
import { getCommonToastIdByType } from "../../Query/CommonToastIdByTypeQuery";
import { createRemoveMessage } from "../../Command/RemoveMessage";
import { findToastById } from "../../Query/ToastQuery";
import { createToastWasAdded } from "../../Event/ToastWasAdded";
import { createToastIntroAnimationWasFinished } from "../../Event/ToastIntroAnimationWasFinished";
import { createMessagesWereAddedToToast } from "../../Event/MessagesWereAddedToToast";
import { createMessageIntroAnimationsWereFinished } from "../../Event/MessageIntroAnimationsWereFinished";

function getToastsToMerge(toasterState: ToasterState): Toast[] {
    const toastsToMerge: Toast[] = [];
    toasterState.messagesToAdd.forEach((messageToAdd) => {
        const toastId = messageToAdd.mustBeShownInSeparateToast
            ? uuidV4()
            : getCommonToastIdByType(messageToAdd.toastType);
        const foundToastIndex = toastsToMerge.findIndex(
            (toast) => toast.id === toastId,
        );
        if (foundToastIndex !== -1) {
            const toast = toastsToMerge[foundToastIndex];
            toastsToMerge[foundToastIndex] = {
                ...toast,
                messages: [messageToAdd.message, ...toast.messages],
            };
            return;
        }
        toastsToMerge.push({
            id: toastId,
            type: messageToAdd.toastType,
            messages: [messageToAdd.message],
        });
    });
    return toastsToMerge;
}

function* startAutomaticMessageCloseTimer(message: Message): Generator {
    if (!message.automaticCloseDelayInMs) {
        return;
    }
    yield delay(message.automaticCloseDelayInMs);
    yield put(createRemoveMessage(message.id));
}

function* startAutomaticMessageCloseTimers(messages: Message[]): Generator {
    for (const index in messages) {
        const message = messages[index];
        yield spawn(startAutomaticMessageCloseTimer, message);
    }
}

function* handleMoveMessagesFromPipelineToToast(
    toasterSettings: ToasterSettings,
    toasterState: ToasterState,
    toastToMerge: Toast,
): Generator {
    const storedToast = findToastById(toasterState, toastToMerge.id);
    if (!storedToast) {
        yield put(createToastWasAdded(toastToMerge));
        yield delay(toasterSettings.toastIntroAnimationTimeInMs);
        yield put(createToastIntroAnimationWasFinished(toastToMerge.id));
        yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
        return;
    }
    yield put(createMessagesWereAddedToToast(toastToMerge.id, toastToMerge.messages),);
    yield delay(toasterSettings.toastMessageIntroAnimationTimeInMs);
    yield put(createMessageIntroAnimationsWereFinished(toastToMerge.messages.map((message) => message.id)));
    yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
}

export function* moveMessagesFromPipelineToToastsHandling(
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector,
): Generator {
    // @ts-ignore
    const toasterState: ToasterState = yield select(toasterStateSelector);
    const toastsToMerge = getToastsToMerge(toasterState);
    for (const index in toastsToMerge) {
        const toastToMerge = toastsToMerge[index];
        yield spawn(
            handleMoveMessagesFromPipelineToToast,
            toasterSettings,
            toasterState,
            toastToMerge,
        );
    }
}
