"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Cookie/Types");
function createRemoveCookie(name) {
    return {
        type: Types_1.CookieCommandTypes.REMOVE_COOKIE,
        payload: {
            cookieName: name
        },
    };
}
exports.createRemoveCookie = createRemoveCookie;
//# sourceMappingURL=RemoveCookie.js.map