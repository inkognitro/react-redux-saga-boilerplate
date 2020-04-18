"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Cookie/Types");
function createCookieWasRemoved(cookieName) {
    return {
        type: Types_1.CookieEventTypes.COOKIE_WAS_REMOVED,
        payload: {
            cookieName: cookieName,
        }
    };
}
exports.createCookieWasRemoved = createCookieWasRemoved;
//# sourceMappingURL=CookieWasRemoved.js.map