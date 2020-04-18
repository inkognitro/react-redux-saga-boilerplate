"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const CommonToastIdByTypeQuery_1 = require("Common/Domain/Toaster/Query/CommonToastIdByTypeQuery");
const effects_1 = require("@redux-saga/core/effects");
const RemoveMessage_1 = require("Common/Domain/Toaster/Command/RemoveMessage");
const ToastQuery_1 = require("Common/Domain/Toaster/Query/ToastQuery");
const ToastWasAdded_1 = require("Common/Domain/Toaster/Event/ToastWasAdded");
const ToastIntroAnimationWasFinished_1 = require("Common/Domain/Toaster/Event/ToastIntroAnimationWasFinished");
const MessagesWereAddedToToast_1 = require("Common/Domain/Toaster/Event/MessagesWereAddedToToast");
const MessageIntroAnimationsWereFinished_1 = require("Common/Domain/Toaster/Event/MessageIntroAnimationsWereFinished");
function getToastsToMerge(toasterState) {
    let toastsToMerge = [];
    toasterState.messagesToAdd.forEach((messageToAdd) => {
        const toastId = (messageToAdd.mustBeShownInSeparateToast
            ? v4_1.default() : CommonToastIdByTypeQuery_1.getCommonToastIdByType(messageToAdd.toastType));
        const foundToastIndex = toastsToMerge.findIndex((toast) => (toast.id === toastId));
        if (foundToastIndex !== -1) {
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
}
function* startAutomaticMessageCloseTimer(message) {
    if (!message.automaticCloseDelayInMs) {
        return;
    }
    yield effects_1.delay(message.automaticCloseDelayInMs);
    yield effects_1.put(RemoveMessage_1.createRemoveMessage(message.id));
}
function* startAutomaticMessageCloseTimers(messages) {
    for (let index in messages) {
        const message = messages[index];
        yield effects_1.spawn(startAutomaticMessageCloseTimer, message);
    }
}
function* handleMoveMessagesFromPipelineToToast(toasterState, toastToMerge) {
    const storedToast = ToastQuery_1.findToastById(toasterState, toastToMerge.id);
    if (!storedToast) {
        yield effects_1.put(ToastWasAdded_1.createToastWasAdded(toastToMerge));
        yield effects_1.delay(800);
        yield effects_1.put(ToastIntroAnimationWasFinished_1.createToastIntroAnimationWasFinished(toastToMerge.id));
        yield effects_1.fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
        return;
    }
    yield effects_1.put(MessagesWereAddedToToast_1.createMessagesWereAddedToToast(toastToMerge.id, toastToMerge.messages));
    yield effects_1.delay(800);
    yield effects_1.put(MessageIntroAnimationsWereFinished_1.createMessageIntroAnimationsWereFinished(toastToMerge.messages.map(message => message.id)));
    yield effects_1.fork(startAutomaticMessageCloseTimers, toastToMerge.messages);
}
function* moveMessagesFromPipelineToToastsHandling(toasterStateSelector) {
    const toasterState = yield effects_1.select(toasterStateSelector);
    const toastsToMerge = getToastsToMerge(toasterState);
    let functionMustBeReExecuted = false;
    for (let index in toastsToMerge) {
        const toastToMerge = toastsToMerge[index];
        yield effects_1.spawn(handleMoveMessagesFromPipelineToToast, toasterState, toastToMerge);
    }
    if (functionMustBeReExecuted) {
        yield effects_1.delay(500);
        yield effects_1.fork(moveMessagesFromPipelineToToastsHandling, toasterStateSelector);
    }
}
exports.moveMessagesFromPipelineToToastsHandling = moveMessagesFromPipelineToToastsHandling;
//# sourceMappingURL=MoveMessagesFromPipelineToToastsHandling.js.map