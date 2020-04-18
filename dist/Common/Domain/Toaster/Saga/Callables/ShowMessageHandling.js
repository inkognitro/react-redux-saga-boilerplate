"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
const effects_1 = require("@redux-saga/core/effects");
const ToastQuery_1 = require("Common/Domain/Toaster/Query/ToastQuery");
const MessageQuery_1 = require("Common/Domain/Toaster/Query/MessageQuery");
const v4_1 = __importDefault(require("uuid/v4"));
const MessageWasAddedToPipeline_1 = require("Common/Domain/Toaster/Event/MessageWasAddedToPipeline");
const MoveMessagesFromPipelineToToastsHandling_1 = require("Common/Domain/Toaster/Saga/Callables/MoveMessagesFromPipelineToToastsHandling");
function createAutomaticCloseDelayInMs(settings) {
    if (settings.automaticCloseDelayInMs !== undefined) {
        return settings.automaticCloseDelayInMs;
    }
    if (settings.toastType === Types_1.ToastTypes.SUCCESS) {
        return 3000;
    }
    return null;
}
function createCanBeClosedManually(settings) {
    if (settings.canBeClosedManually) {
        return true;
    }
    return (settings.toastType !== Types_1.ToastTypes.SUCCESS);
}
function* handleShowMessage(toasterStateSelector, command) {
    const toasterState = yield effects_1.select(toasterStateSelector);
    if (command.payload.id && ToastQuery_1.findToastByMessageId(toasterState, command.payload.id)) {
        return;
    }
    if (command.payload.id && MessageQuery_1.findMessageToAddByMessageId(toasterState, command.payload.id)) {
        return;
    }
    if (!command.payload.content) {
        return;
    }
    const messageToAdd = {
        toastType: (command.payload.toastType ? command.payload.toastType : Types_1.ToastTypes.INFO),
        mustBeShownInSeparateToast: !!command.payload.mustBeShownInSeparateToast,
        message: {
            id: (command.payload.id ? command.payload.id : v4_1.default()),
            content: command.payload.content,
            automaticCloseDelayInMs: createAutomaticCloseDelayInMs(command.payload),
            canBeClosedManually: createCanBeClosedManually(command.payload),
        }
    };
    yield effects_1.put(MessageWasAddedToPipeline_1.createMessageWasAddedToPipeline(messageToAdd));
    yield effects_1.delay(200);
    yield effects_1.fork(MoveMessagesFromPipelineToToastsHandling_1.moveMessagesFromPipelineToToastsHandling, toasterStateSelector);
}
exports.handleShowMessage = handleShowMessage;
//# sourceMappingURL=ShowMessageHandling.js.map