"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const RouterWasInitialized_1 = require("Common/Domain/Router/Event/RouterWasInitialized");
const CurrentUrlWasChanged_1 = require("Common/Domain/Router/Event/CurrentUrlWasChanged");
const ExtendRouterHandling_1 = require("Common/Domain/Router/Saga/Flow/ExtendRouterHandling");
const OpenUrlHandling_1 = require("Common/Domain/Router/Saga/Flow/OpenUrlHandling");
function createRouterFlow(routerStateSelector, historyManager) {
    const watchCurrentUrlChange = function* () {
        while (true) {
            const url = yield effects_1.call(historyManager.getOnChangeCurrentUrlPromise);
            effects_1.put(CurrentUrlWasChanged_1.createCurrentUrlWasChanged(url));
        }
    };
    const initializeRouter = function* () {
        yield effects_1.put(RouterWasInitialized_1.createRouterWasInitialized(historyManager.getCurrentUrl()));
    };
    return function* () {
        yield effects_1.call(initializeRouter);
        yield effects_1.spawn(watchCurrentUrlChange);
        yield effects_1.spawn(OpenUrlHandling_1.createWatchOpenUrlFlow(routerStateSelector, historyManager));
        yield effects_1.spawn(ExtendRouterHandling_1.createWatchExtendRouterFlow(routerStateSelector));
    };
}
exports.createRouterFlow = createRouterFlow;
//# sourceMappingURL=Router.js.map