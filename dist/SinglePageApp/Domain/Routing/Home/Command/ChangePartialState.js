"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const Home_1 = require("../Home");
const PartialStateWasChanged_1 = require("../Event/PartialStateWasChanged");
function createChangePartialStateSaga() {
    return function* watchLeakReduxState() {
        yield effects_1.takeEvery(Home_1.HomeCommandTypes.CHANGE_PARTIAL_STATE, function* (command) {
            yield effects_1.put(PartialStateWasChanged_1.createPartialStateWasChanged(command.payload));
        });
    };
}
exports.createChangePartialStateSaga = createChangePartialStateSaga;
function createChangePartialState(state) {
    return {
        type: Home_1.HomeCommandTypes.CHANGE_PARTIAL_STATE,
        payload: state,
    };
}
exports.createChangePartialState = createChangePartialState;
//# sourceMappingURL=ChangePartialState.js.map