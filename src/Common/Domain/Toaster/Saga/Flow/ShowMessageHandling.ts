import {
    MessageToAdd,
    ToasterCommandTypes,
    ToasterState,
    ToasterStateSelector,
    ToastTypes
} from "Common/Domain/Toaster/Types";
import {delay, put, select, takeEvery, fork} from "@redux-saga/core/effects";
import {findToastByMessageId} from "Common/Domain/Toaster/Query/ToastQuery";
import {findMessageToAddByMessageId} from "Common/Domain/Toaster/Query/MessageQuery";
import uuidV4 from "uuid/v4";
import {createMessageWasAddedToPipeline} from "Common/Domain/Toaster/Event/MessageWasAddedToPipeline";
import {ShowMessageSettings, ShowMessage} from "Common/Domain/Toaster/Command/ShowMessage";
import {moveMessagesFromPipelineToToasts} from "Common/Domain/Toaster/Saga/Callables/MoveMessagesFromPipelineToToasts";

export function createWatchShowMessageFlow(toasterStateSelector: ToasterStateSelector): GeneratorFunction {
    const createAutomaticCloseDelayInMs = function (settings: ShowMessageSettings): (null | number) {
        if (settings.automaticCloseDelayInMs !== undefined) {
            return settings.automaticCloseDelayInMs;
        }
        if (settings.toastType === ToastTypes.SUCCESS) {
            return 3000;
        }
        return null;
    };

    const createCanBeClosedManually = function (settings: ShowMessageSettings): boolean {
        if (settings.canBeClosedManually) {
            return true;
        }
        return (settings.toastType !== ToastTypes.SUCCESS);
    };

    const handleShowMessage = function* (command: ShowMessage): Generator {
        //@ts-ignore
        const toasterState: ToasterState = yield select(toasterStateSelector);
        if (command.payload.id && findToastByMessageId(toasterState, command.payload.id)) {
            return;
        }
        if (command.payload.id && findMessageToAddByMessageId(toasterState, command.payload.id)) {
            return;
        }
        const messageToAdd: MessageToAdd = {
            toastType: (command.payload.toastType ? command.payload.toastType : ToastTypes.INFO),
            mustBeShownInSeparateToast: !!command.payload.mustBeShownInSeparateToast,
            message: {
                id: (command.payload.id ? command.payload.id : uuidV4()),
                content: command.payload.content,
                automaticCloseDelayInMs: createAutomaticCloseDelayInMs(command.payload),
                canBeClosedManually: createCanBeClosedManually(command.payload),
            }
        };
        yield put(createMessageWasAddedToPipeline(messageToAdd));
        yield delay(200);
        yield fork(moveMessagesFromPipelineToToasts, toasterStateSelector);
    };

    return <GeneratorFunction>function* (): Generator {
        yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage);
    }
}