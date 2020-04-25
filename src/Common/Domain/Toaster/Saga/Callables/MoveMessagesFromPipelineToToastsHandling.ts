import {
    Message,
    Toast,
    ToasterState,
    ToasterStateSelector,
} from "Common/Domain/Toaster/Types";
import uuidV4 from "uuid/v4";
import { getCommonToastIdByType } from "Common/Domain/Toaster/Query/CommonToastIdByTypeQuery";
import {
    delay, fork, put, select, spawn,
} from "redux-saga/effects";
import { createRemoveMessage } from "Common/Domain/Toaster/Command/RemoveMessage";
import { findToastById } from "Common/Domain/Toaster/Query/ToastQuery";
import { createToastWasAdded } from "Common/Domain/Toaster/Event/ToastWasAdded";
import { createToastIntroAnimationWasFinished } from "Common/Domain/Toaster/Event/ToastIntroAnimationWasFinished";
import { createMessagesWereAddedToToast } from "Common/Domain/Toaster/Event/MessagesWereAddedToToast";
import { createMessageIntroAnimationsWereFinished } from "Common/Domain/Toaster/Event/MessageIntroAnimationsWereFinished";

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
    toasterState: ToasterState,
    toastToMerge: Toast,
): Generator {
    const storedToast = findToastById(toasterState, toastToMerge.id);
    if (!storedToast) {
        yield put(createToastWasAdded(toastToMerge));
        yield delay(800);
        yield put(createToastIntroAnimationWasFinished(toastToMerge.id));
        yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
        return;
    }
    yield put(
        createMessagesWereAddedToToast(toastToMerge.id, toastToMerge.messages),
    );
    yield delay(800);
    yield put(
        createMessageIntroAnimationsWereFinished(
            toastToMerge.messages.map((message) => message.id),
        ),
    );
    yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
}

export function* moveMessagesFromPipelineToToastsHandling(
    toasterStateSelector: ToasterStateSelector,
): Generator {
    // @ts-ignore
    const toasterState: ToasterState = yield select(toasterStateSelector);
    const toastsToMerge = getToastsToMerge(toasterState);
    const functionMustBeReExecuted = false;
    for (const index in toastsToMerge) {
        const toastToMerge = toastsToMerge[index];
        yield spawn(
            handleMoveMessagesFromPipelineToToast,
            toasterState,
            toastToMerge,
        );
    }
    if (functionMustBeReExecuted) {
        yield delay(500);
        yield fork(moveMessagesFromPipelineToToastsHandling, toasterStateSelector);
    }
}
