"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
const effects_1 = require("@redux-saga/core/effects");
const ToastQuery_1 = require("Common/Domain/Toaster/Query/ToastQuery");
const MessageQuery_1 = require("Common/Domain/Toaster/Query/MessageQuery");
const ToastOutroAnimationWasStarted_1 = require("Common/Domain/Toaster/Event/ToastOutroAnimationWasStarted");
const ToastWasRemoved_1 = require("Common/Domain/Toaster/Event/ToastWasRemoved");
const MessageOutroAnimationWasStarted_1 = require("Common/Domain/Toaster/Event/MessageOutroAnimationWasStarted");
const MessageWasRemoved_1 = require("Common/Domain/Toaster/Event/MessageWasRemoved");
function createWatchRemoveMessageFlow(toasterStateSelector) {
    const handleRemoveMessage = function* (command) {
        const toasterState = yield effects_1.select(toasterStateSelector);
        const messageIdToRemove = command.payload.messageId;
        const toast = ToastQuery_1.findToastByMessageId(toasterState, messageIdToRemove);
        if (!toast) {
            return;
        }
        const nonRemovingMessages = MessageQuery_1.getNonRemovingMessagesInToast(toasterState, toast.id);
        if (nonRemovingMessages.length === 1) {
            if (nonRemovingMessages[0].id !== messageIdToRemove) {
                return;
            }
            yield effects_1.put(ToastOutroAnimationWasStarted_1.createToastOutroAnimationWasStarted(toast.id));
            yield effects_1.delay(800);
            yield effects_1.put(ToastWasRemoved_1.createToastWasRemoved(toast.id));
            return;
        }
        yield effects_1.put(MessageOutroAnimationWasStarted_1.createMessageOutroAnimationWasStarted(messageIdToRemove));
        yield effects_1.delay(550);
        yield effects_1.put(MessageWasRemoved_1.createMessageWasRemoved(messageIdToRemove));
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.ToasterCommandTypes.REMOVE_MESSAGE, handleRemoveMessage);
    };
}
exports.createWatchRemoveMessageFlow = createWatchRemoveMessageFlow;
//# sourceMappingURL=RemoveMessageHandling.js.map