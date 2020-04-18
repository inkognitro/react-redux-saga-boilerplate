"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createMessageWasRemoved(messageId) {
    return {
        type: Types_1.ToasterEventTypes.MESSAGE_WAS_REMOVED,
        payload: {
            messageId: messageId,
        }
    };
}
exports.createMessageWasRemoved = createMessageWasRemoved;
//# sourceMappingURL=MessageWasRemoved.js.map