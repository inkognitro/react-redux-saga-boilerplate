"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createShowMessage(settings) {
    return {
        type: Types_1.ToasterCommandTypes.SHOW_MESSAGE,
        payload: settings,
    };
}
exports.createShowMessage = createShowMessage;
//# sourceMappingURL=ShowMessage.js.map