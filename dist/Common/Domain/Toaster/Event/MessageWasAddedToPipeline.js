"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createMessageWasAddedToPipeline(messageToAdd) {
    return {
        type: Types_1.ToasterEventTypes.MESSAGE_WAS_ADDED_TO_PIPELINE,
        payload: {
            messageToAdd: messageToAdd,
        }
    };
}
exports.createMessageWasAddedToPipeline = createMessageWasAddedToPipeline;
//# sourceMappingURL=MessageWasAddedToPipeline.js.map