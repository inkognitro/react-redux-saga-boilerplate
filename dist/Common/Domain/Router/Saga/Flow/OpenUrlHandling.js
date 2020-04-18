"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Router/Types");
const effects_1 = require("@redux-saga/core/effects");
const UrlQuery_1 = require("Common/Domain/Router/Query/UrlQuery");
function createWatchOpenUrlFlow(routerStateSelector, historyManager) {
    const handleOpenUrl = function* (command) {
        const routerState = yield effects_1.select(routerStateSelector);
        const target = (!command.payload.target ? '_self' : command.payload.target);
        if (target !== '_self') {
            historyManager.openUrlInOtherTarget(command.payload.url, target);
            return;
        }
        const url = UrlQuery_1.getByRedirectInfluencedUrl(routerState, command.payload.url);
        historyManager.changeCurrentUrl(url, !!command.payload.shouldReplaceCurrentUrl);
    };
    return function* () {
        yield effects_1.takeEvery(Types_1.RouterCommandTypes.OPEN_URL, handleOpenUrl);
    };
}
exports.createWatchOpenUrlFlow = createWatchOpenUrlFlow;
//# sourceMappingURL=OpenUrlHandling.js.map