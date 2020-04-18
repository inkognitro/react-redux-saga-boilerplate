"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
function createCurrentUrlWasChanged(url) {
    return {
        type: Types_1.RouterEventTypes.CURRENT_URL_WAS_CHANGED,
        payload: {
            url: url,
        }
    };
}
exports.createCurrentUrlWasChanged = createCurrentUrlWasChanged;
//# sourceMappingURL=CurrentUrlWasChanged.js.map