"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Cookie/Types");
function createSaveCookie(cookie) {
    return {
        type: Types_1.CookieCommandTypes.SAVE_COOKIE,
        payload: {
            cookie: cookie,
        },
    };
}
exports.createSaveCookie = createSaveCookie;
//# sourceMappingURL=SaveCookie.js.map