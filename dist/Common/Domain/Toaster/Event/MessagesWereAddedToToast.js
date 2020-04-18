"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createMessagesWereAddedToToast(toastId, messages) {
    return {
        type: Types_1.ToasterEventTypes.MESSAGES_WERE_ADDED_TO_TOAST,
        payload: {
            toastId: toastId,
            messages: messages,
        }
    };
}
exports.createMessagesWereAddedToToast = createMessagesWereAddedToToast;
//# sourceMappingURL=MessagesWereAddedToToast.js.map