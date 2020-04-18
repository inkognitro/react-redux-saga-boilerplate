"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Reducer_1 = require("Common/Domain/Form/Element/TextField/Event/Reducer");
const redux_1 = require("redux");
exports.homeReducer = redux_1.combineReducers({
    toastContentField: Reducer_1.createTextFieldReducer(Reducer_1.createTextFieldState({ value: 'Hi there :)' }))
});
//# sourceMappingURL=Reducer.js.map