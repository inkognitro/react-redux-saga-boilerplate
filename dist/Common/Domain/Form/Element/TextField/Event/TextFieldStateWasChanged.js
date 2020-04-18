"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Form/Element/TextField/Types");
function createTextFieldStateWasChanged(id, stateChanges) {
    return {
        type: Types_1.TextFieldEventTypes.TEXT_FIELD_STATE_WAS_CHANGED,
        payload: { id, stateChanges }
    };
}
exports.createTextFieldStateWasChanged = createTextFieldStateWasChanged;
//# sourceMappingURL=TextFieldStateWasChanged.js.map