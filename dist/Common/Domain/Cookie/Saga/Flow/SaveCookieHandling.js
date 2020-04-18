"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const CookieWasSaved_1 = require("Common/Domain/Cookie/Event/CookieWasSaved");
const Types_1 = require("Common/Domain/Cookie/Types");
function createWatchSaveCookieFlow(cookieStorage) {
    const handleSaveCookie = function* (command) {
        cookieStorage.saveCookie(command.payload.cookie);
        yield effects_1.put(CookieWasSaved_1.createCookieWasSaved(command.payload.cookie));
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.CookieCommandTypes.SAVE_COOKIE, handleSaveCookie);
    };
}
exports.createWatchSaveCookieFlow = createWatchSaveCookieFlow;
//# sourceMappingURL=SaveCookieHandling.js.map