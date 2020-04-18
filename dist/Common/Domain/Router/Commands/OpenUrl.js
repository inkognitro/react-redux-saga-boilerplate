"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
function createOpenUrl(settings) {
    return {
        type: Types_1.RouterCommandTypes.OPEN_URL,
        payload: settings
    };
}
exports.createOpenUrl = createOpenUrl;
//# sourceMappingURL=OpenUrl.js.map