"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createMessageIntroAnimationsWereFinished(messageIds) {
    return {
        type: Types_1.ToasterEventTypes.MESSAGE_INTRO_ANIMATIONS_WERE_FINISHED,
        payload: {
            messageIds: messageIds
        }
    };
}
exports.createMessageIntroAnimationsWereFinished = createMessageIntroAnimationsWereFinished;
//# sourceMappingURL=MessageIntroAnimationsWereFinished.js.map