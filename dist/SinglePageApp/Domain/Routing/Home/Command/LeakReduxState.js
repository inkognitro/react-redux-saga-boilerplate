"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const Home_1 = require("../Home");
function createWatchLeakReduxStateSaga() {
    return function* watchLeakReduxState() {
        yield effects_1.takeEvery(Home_1.HomeCommandTypes.LEAK_REDUX_STATE, function* (_) {
            const state = yield effects_1.select();
            console.log(state);
        });
    };
}
exports.createWatchLeakReduxStateSaga = createWatchLeakReduxStateSaga;
function createLeakReduxState() {
    return {
        type: Home_1.HomeCommandTypes.LEAK_REDUX_STATE,
        payload: undefined,
    };
}
exports.createLeakReduxState = createLeakReduxState;
//# sourceMappingURL=LeakReduxState.js.map