import {
    ShowMessage,
    ShowMessageSettings,
} from "Common/Domain/Toaster/Command/ShowMessage";
import {
    MessageToAdd,
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "Common/Domain/Toaster/Types";
import {
    delay, fork, put, select,
} from "@redux-saga/core/effects";
import { findToastByMessageId } from "Common/Domain/Toaster/Query/ToastQuery";
import { findMessageToAddByMessageId } from "Common/Domain/Toaster/Query/MessageQuery";
import uuidV4 from "uuid/v4";
import { createMessageWasAddedToPipeline } from "Common/Domain/Toaster/Event/MessageWasAddedToPipeline";
import { moveMessagesFromPipelineToToastsHandling } from "Common/Domain/Toaster/Saga/Callables/MoveMessagesFromPipelineToToastsHandling";

function createAutomaticCloseDelayInMs(
    settings: ShowMessageSettings,
): null | number {
    if (settings.automaticCloseDelayInMs !== undefined) {
        return settings.automaticCloseDelayInMs;
    }
    if (settings.toastType === ToastTypes.SUCCESS) {
        return 3000;
    }
    return null;
}

function createCanBeClosedManually(settings: ShowMessageSettings): boolean {
    if (settings.canBeClosedManually) {
        return true;
    }
    return settings.toastType !== ToastTypes.SUCCESS;
}

export function* handleShowMessage(
    toasterStateSelector: ToasterStateSelector,
    command: ShowMessage,
): Generator {
    // @ts-ignore
    const toasterState: ToasterState = yield select(toasterStateSelector);
    if (
        command.payload.id
    && findToastByMessageId(toasterState, command.payload.id)
    ) {
        return;
    }
    if (
        command.payload.id
    && findMessageToAddByMessageId(toasterState, command.payload.id)
    ) {
        return;
    }
    if (!command.payload.content) {
        return;
    }
    const messageToAdd: MessageToAdd = {
        toastType: command.payload.toastType
            ? command.payload.toastType
            : ToastTypes.INFO,
        mustBeShownInSeparateToast: !!command.payload.mustBeShownInSeparateToast,
        message: {
            id: command.payload.id ? command.payload.id : uuidV4(),
            content: command.payload.content,
            automaticCloseDelayInMs: createAutomaticCloseDelayInMs(command.payload),
            canBeClosedManually: createCanBeClosedManually(command.payload),
        },
    };
    yield put(createMessageWasAddedToPipeline(messageToAdd));
    yield delay(200);
    yield fork(moveMessagesFromPipelineToToastsHandling, toasterStateSelector);
}
