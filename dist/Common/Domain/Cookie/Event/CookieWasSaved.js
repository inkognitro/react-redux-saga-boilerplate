"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Cookie/Types");
function createCookieWasSaved(cookie) {
    return {
        type: Types_1.CookieEventTypes.COOKIE_WAS_SAVED,
        payload: {
            cookie: cookie,
        }
    };
}
exports.createCookieWasSaved = createCookieWasSaved;
//# sourceMappingURL=CookieWasSaved.js.map