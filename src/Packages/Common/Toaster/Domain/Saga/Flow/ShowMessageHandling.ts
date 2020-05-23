import uuidV4 from "uuid/v4";
import {
    MessageToAdd,
    ToasterState,
    ToasterStateSelector,
    ToastTypes,
} from "Packages/Common/Toaster/Domain/Types";
import {
    delay, fork, put, select,
} from "redux-saga/effects";
import {
    ShowMessage,
    ShowMessageSettings,
} from "../../Command/ShowMessage";
import { findToastByMessageId } from "../../Query/ToastQuery";
import { findMessageToAddByMessageId } from "../../Query/MessageQuery";
import { createMessageWasAddedToPipeline } from "../../Event/MessageWasAddedToPipeline";
import {
    moveMessagesFromPipelineToToastsHandling,
} from "./MoveMessagesFromPipelineToToastsHandling";

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
    yield delay(200);
    yield fork(moveMessagesFromPipelineToToastsHandling, toasterStateSelector);
}
