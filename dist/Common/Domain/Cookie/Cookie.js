"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const RemoveCookieHandling_1 = require("Common/Domain/Cookie/Saga/Flow/RemoveCookieHandling");
const SaveCookieHandling_1 = require("Common/Domain/Cookie/Saga/Flow/SaveCookieHandling");
function createCookieFlow(cookieStorage) {
    return function* routerSaga() {
        yield effects_1.spawn(RemoveCookieHandling_1.createWatchRemoveCookieFlow(cookieStorage));
        yield effects_1.spawn(SaveCookieHandling_1.createWatchSaveCookieFlow(cookieStorage));
    };
}
exports.createCookieFlow = createCookieFlow;
//# sourceMappingURL=Cookie.js.map