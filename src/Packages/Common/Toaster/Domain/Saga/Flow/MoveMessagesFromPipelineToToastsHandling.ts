import {
    Message,
    Toast,
    ToasterState,
    ToasterStateSelector,
} from "Packages/Common/Toaster/Domain/Types";
import uuidV4 from "uuid/v4";
import { getCommonToastIdByType } from "Packages/Common/Toaster/Domain/Query/CommonToastIdByTypeQuery";
import {
    delay, fork, put, select, spawn,
} from "redux-saga/effects";
import { createRemoveMessage } from "Packages/Common/Toaster/Domain/Command/RemoveMessage";
import { findToastById } from "Packages/Common/Toaster/Domain/Query/ToastQuery";
import { createToastWasAdded } from "Packages/Common/Toaster/Domain/Event/ToastWasAdded";
import { createToastIntroAnimationWasFinished } from "Packages/Common/Toaster/Domain/Event/ToastIntroAnimationWasFinished";
import { createMessagesWereAddedToToast } from "Packages/Common/Toaster/Domain/Event/MessagesWereAddedToToast";
import {
    createMessageIntroAnimationsWereFinished,
} from "Packages/Common/Toaster/Domain/Event/MessageIntroAnimationsWereFinished";

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
