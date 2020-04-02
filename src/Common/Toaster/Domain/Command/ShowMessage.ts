import {Command} from "Common/Bootstrap/Command";
import {select, takeEvery, put, delay} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";
import {MessageToAdd, ToasterState, ToasterStateSelector, ToastTypes} from "Common/Toaster/Domain/Types";
import uuidV4 from 'uuid/v4';
import {findToastByMessageId} from "Common/Toaster/Domain/Query/ToastQuery";
import {findMessageToAddByMessageId} from "Common/Toaster/Domain/Query/MessageQuery";
import {createMessageWasAddedToPipeline} from "Common/Toaster/Domain/Event/MessageWasAddedToPipeline";
import {createMoveMessagesFromPipelineToToasts} from "Common/Toaster/Domain/Command/MoveMessagesFromPipelineToToasts";

export function createWatchShowMessageSaga(toasterStateSelector: ToasterStateSelector): GeneratorFunction {
    const createAutomaticCloseDelayInMs = function(settings: Payload): (null | number) {
        if(settings.automaticCloseDelayInMs !== undefined) {
            return settings.automaticCloseDelayInMs;
        }
        if (settings.toastType === ToastTypes.SUCCESS) {
            return 3000;
        }
        return null;
    };

    const createCanBeClosedManually = function(settings: Payload): boolean {
        if(settings.canBeClosedManually) {
            return true;
        }
        return (settings.toastType !== ToastTypes.SUCCESS);
    };

    const handleShowMessage = function* (command: ShowMessage): Generator {
        //@ts-ignore
        const toasterState: ToasterState = yield select(toasterStateSelector);
        if(command.payload.id && findToastByMessageId(toasterState, command.payload.id)) {
            return;
        }
        if(command.payload.id && findMessageToAddByMessageId(toasterState, command.payload.id)) {
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
        yield put(createMoveMessagesFromPipelineToToasts());
    };

    return <GeneratorFunction>function* watchShowMessage(): Generator {
        yield takeEvery(ToasterCommandTypes.SHOW_MESSAGE, handleShowMessage);
    }
}

export function createShowMessage(settings: Payload): ShowMessage {
    return {
        type: ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}

export type ShowMessage = Command<ToasterCommandTypes.SHOW_MESSAGE, Payload>;

type Payload = {
    id?: string,
    toastType: ToastTypes,
    content: string,
    canBeClosedManually?: boolean,
    automaticCloseDelayInMs?: (null | number),
    mustBeShownInSeparateToast?: boolean,
};