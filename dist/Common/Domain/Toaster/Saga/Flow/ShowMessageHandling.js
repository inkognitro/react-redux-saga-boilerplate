"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
const effects_1 = require("@redux-saga/core/effects");
const matchers_1 = require("redux-saga-test-plan/matchers");
const ShowMessageHandling_1 = require("Common/Domain/Toaster/Saga/Callables/ShowMessageHandling");
function createWatchShowMessageFlow(toasterStateSelector) {
    function* handle(command) {
        yield matchers_1.call(ShowMessageHandling_1.handleShowMessage, toasterStateSelector, command);
    }
    return function* () {
        yield effects_1.takeEvery(Types_1.ToasterCommandTypes.SHOW_MESSAGE, handle);
    };
}
exports.createWatchShowMessageFlow = createWatchShowMessageFlow;
//# sourceMappingURL=ShowMessageHandling.js.map