"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const v4_1 = __importDefault(require("uuid/v4"));
const Types_1 = require("Common/Domain/Form/Element/TextField/Types");
function createTextFieldState(partialInitialState = {}) {
    const state = {
        id: v4_1.default(),
        type: Types_1.Types.TEXT,
        value: '',
        readOnly: false,
        messages: [],
    };
    return Object.assign(Object.assign({}, state), partialInitialState);
}
exports.createTextFieldState = createTextFieldState;
function createTextFieldReducer(initialState) {
    return function (state = initialState, event) {
        if (!event) {
            return state;
        }
        if (event.type === Types_1.TextFieldEventTypes.TEXT_FIELD_STATE_WAS_CHANGED && event.payload.id === state.id) {
            return Object.assign(Object.assign({}, state), event.payload.stateChanges);
        }
        return state;
    };
}
exports.createTextFieldReducer = createTextFieldReducer;
//# sourceMappingURL=Reducer.js.map