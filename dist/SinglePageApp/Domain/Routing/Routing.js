"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const redux_1 = require("redux");
const Reducer_1 = require("./Home/Event/Reducer");
const effects_1 = require("@redux-saga/core/effects");
const Home_1 = require("./Home/Home");
function createRoutingSaga() {
    return function* routingSaga() {
        yield effects_1.spawn(Home_1.createHomeSaga());
    };
}
exports.createRoutingSaga = createRoutingSaga;
exports.routingReducer = redux_1.combineReducers({
    home: Reducer_1.homeReducer,
});
//# sourceMappingURL=Routing.js.map