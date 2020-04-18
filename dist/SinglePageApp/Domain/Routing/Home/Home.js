"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const effects_1 = require("@redux-saga/core/effects");
const LeakReduxState_1 = require("./Command/LeakReduxState");
const ChangePartialState_1 = require("./Command/ChangePartialState");
var HomeCommandTypes;
(function (HomeCommandTypes) {
    HomeCommandTypes["LEAK_REDUX_STATE"] = "LEAK_REDUX_STATE-a8e50935-b646-4051-a727-f393c658d1e6";
    HomeCommandTypes["CHANGE_PARTIAL_STATE"] = "CHANGE_TEST_TEXT_FIELD_VALUE-a8e50935-b646-4051-a727-f393c658d1e6";
})(HomeCommandTypes = exports.HomeCommandTypes || (exports.HomeCommandTypes = {}));
function createHomeSaga() {
    return function* homeSaga() {
        yield effects_1.spawn(LeakReduxState_1.createWatchLeakReduxStateSaga());
        yield effects_1.spawn(ChangePartialState_1.createChangePartialStateSaga());
    };
}
exports.createHomeSaga = createHomeSaga;
exports.homeRoute = {
    urlSchema: '/',
    urlMustMatchExactly: true,
};
exports.createHomeRouteUrl = () => {
    return exports.homeRoute.urlSchema;
};
//# sourceMappingURL=Home.js.map