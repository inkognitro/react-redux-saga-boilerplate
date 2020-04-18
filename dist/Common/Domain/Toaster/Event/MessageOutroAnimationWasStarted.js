"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createMessageOutroAnimationWasStarted(messageId) {
    return {
        type: Types_1.ToasterEventTypes.MESSAGE_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            messageId: messageId
        }
    };
}
exports.createMessageOutroAnimationWasStarted = createMessageOutroAnimationWasStarted;
//# sourceMappingURL=MessageOutroAnimationWasStarted.js.map