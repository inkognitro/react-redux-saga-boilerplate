"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createRemoveMessage(messageId) {
    return {
        type: Types_1.ToasterCommandTypes.REMOVE_MESSAGE,
        payload: {
            messageId: messageId
        },
    };
}
exports.createRemoveMessage = createRemoveMessage;
//# sourceMappingURL=RemoveMessage.js.map