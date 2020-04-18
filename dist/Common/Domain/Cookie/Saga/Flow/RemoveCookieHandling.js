"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const CookieWasRemoved_1 = require("Common/Domain/Cookie/Event/CookieWasRemoved");
const Types_1 = require("Common/Domain/Cookie/Types");
function createWatchRemoveCookieFlow(cookieStorage) {
    const handleRemoveCookie = function* (command) {
        if (!cookieStorage.findCookieContent(command.payload.cookieName)) {
            return;
        }
        cookieStorage.removeCookie(command.payload.cookieName);
        yield effects_1.put(CookieWasRemoved_1.createCookieWasRemoved(command.payload.cookieName));
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.CookieCommandTypes.REMOVE_COOKIE, handleRemoveCookie);
    };
}
exports.createWatchRemoveCookieFlow = createWatchRemoveCookieFlow;
//# sourceMappingURL=RemoveCookieHandling.js.map