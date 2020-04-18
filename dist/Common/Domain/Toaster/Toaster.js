"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const RemoveMessageHandling_1 = require("Common/Domain/Toaster/Saga/Flow/RemoveMessageHandling");
const ShowMessageHandling_1 = require("Common/Domain/Toaster/Saga/Flow/ShowMessageHandling");
function createToasterFlow(toasterStateSelector) {
    return function* toasterFlow() {
        yield effects_1.spawn(ShowMessageHandling_1.createWatchShowMessageFlow(toasterStateSelector));
        yield effects_1.spawn(RemoveMessageHandling_1.createWatchRemoveMessageFlow(toasterStateSelector));
    };
}
exports.createToasterFlow = createToasterFlow;
//# sourceMappingURL=Toaster.js.map