import {Command} from "Common/Bootstrap/Command";
import {delay, put, select, takeEvery, spawn, fork} from "@redux-saga/core/effects";
import {ToasterCommandTypes} from "Common/Toaster/Domain/Toaster";
import {Message, Toast, ToasterState, ToasterStateSelector} from "Common/Toaster/Domain/Types";
import {findToastById} from "Common/Toaster/Domain/Query/ToastQuery";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Query/CommonToastIdByTypeQuery";
import uuidV4 from 'uuid/v4';
import {createToastWasAdded} from "Common/Toaster/Domain/Event/ToastWasAdded";
import {createToastIntroAnimationWasFinished} from "Common/Toaster/Domain/Event/ToastIntroAnimationWasFinished";
import {createRemoveMessage} from "Common/Toaster/Domain/Command/RemoveMessage";
import {createMessagesWereAddedToToast} from "Common/Toaster/Domain/Event/MessagesWereAddedToToast";
import {createMessageIntroAnimationsWereFinished} from "Common/Toaster/Domain/Event/MessageIntroAnimationsWereFinished";

export function createWatchMoveMessagesFromPipelineToToastsSaga(
    toasterStateSelector: ToasterStateSelector
): GeneratorFunction {
    const getToastsToMerge = function(toasterState: ToasterState): Toast[] {
        let toastsToMerge: Toast[] = [];
        toasterState.messagesToAdd.forEach((messageToAdd) => {
            const toastId = (messageToAdd.mustBeShownInSeparateToast
                    ? uuidV4() : getCommonToastIdByType(messageToAdd.toastType)
            );
            const foundToastIndex = toastsToMerge.findIndex((toast) => (toast.id === toastId));
            if(foundToastIndex !== -1) {
                const toast = toastsToMerge[foundToastIndex];
                toastsToMerge[foundToastIndex] = Object.assign({}, toast, {
                    messages: [
                        messageToAdd.message,
                        ...toast.messages,
                    ],
                });
                return;
            }
            toastsToMerge.push({
                id: toastId,
                type: messageToAdd.toastType,
                messages: [messageToAdd.message],
            });
        });
        return toastsToMerge;
    };

    const startAutomaticMessageCloseTimer = function* (message: Message): Generator {
        if(!message.automaticCloseDelayInMs) {
            return;
        }
        yield delay(message.automaticCloseDelayInMs);
        yield put(createRemoveMessage(message.id));
    };

    const startAutomaticMessageCloseTimers = function* (messages: Message[]): Generator {
        for(let index in messages) {
            const message = messages[index];
            yield spawn(startAutomaticMessageCloseTimer, message);
        }
    };

    const handleMoveMessagesFromPipelineToToast = function* (toasterState: ToasterState, toastToMerge: Toast): Generator {
        const storedToast = findToastById(toasterState, toastToMerge.id);
        if(!storedToast) {
            yield put(createToastWasAdded(toastToMerge));
            yield delay(800);
            yield put(createToastIntroAnimationWasFinished(toastToMerge.id));
            yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
            return;
        }
        yield put(createMessagesWereAddedToToast(toastToMerge.id, toastToMerge.messages));
        yield delay(800);
        yield put(createMessageIntroAnimationsWereFinished(toastToMerge.messages.map(message => message.id)));
        yield fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
    };

    const handleMoveMessagesFromPipelineToToasts = function* (command: MoveMessagesFromPipelineToToasts): Generator {
        //@ts-ignore
        const toasterState: ToasterState = yield select(toasterStateSelector);
        const toastsToMerge = getToastsToMerge(toasterState);
        let functionMustBeReExecuted = false;
        for(let index in toastsToMerge) {
            const toastToMerge = toastsToMerge[index];
            yield spawn(handleMoveMessagesFromPipelineToToast, toasterState, toastToMerge);
        }
        if(functionMustBeReExecuted) {
            yield delay(500);
            yield spawn(handleMoveMessagesFromPipelineToToasts, command);
        }
    };

    return <GeneratorFunction>function* watchMoveMessagesFromPipelineToToasts(): Generator {
        yield takeEvery(
            ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS,
            handleMoveMessagesFromPipelineToToasts
        );
    }
}

export function createMoveMessagesFromPipelineToToasts(): MoveMessagesFromPipelineToToasts {
    return {
        type: ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS,
        payload: undefined,
    };
}

export type MoveMessagesFromPipelineToToasts = Command<ToasterCommandTypes.MOVE_MESSAGES_FROM_PIPELINE_TO_TOASTS>;