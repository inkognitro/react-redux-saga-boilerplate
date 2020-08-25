import uuidV4 from "uuid/v4";
import {
    delay, fork, put, select,
} from "redux-saga/effects";
import {
    MessageToAdd, ToasterSettings,
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "../../types";
import { moveMessagesFromPipelineToToastsHandling } from "./move.messages.from.pipeline.to.toasts.handling";
import {ShowMessage, ShowMessageSettings} from "../../command";
import {createMessageWasAddedToPipeline} from "../../event";
import {findMessageToAddByMessageId, findToastByMessageId} from "../../query";

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
    toasterSettings: ToasterSettings,
    toasterStateSelector: ToasterStateSelector,
    command: ShowMessage,
): Generator {
    // @ts-ignore
    const toasterState: ToasterState = yield select(toasterStateSelector);
    if (command.payload.id && findToastByMessageId(toasterState, command.payload.id)) {
        return;
    }
    if (command.payload.id && findMessageToAddByMessageId(toasterState, command.payload.id)) {
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
    yield delay(toasterSettings.asyncToastWaitingTimeInMs);
    yield fork(moveMessagesFromPipelineToToastsHandling, toasterSettings, toasterStateSelector);
}
