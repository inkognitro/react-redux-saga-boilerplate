"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("../Types");
function createPartialStateWasChanged(state) {
    return {
        type: Types_1.HomeEventTypes.PARTIAL_STATE_WAS_CHANGED,
        payload: state,
    };
}
exports.createPartialStateWasChanged = createPartialStateWasChanged;
//# sourceMappingURL=PartialStateWasChanged.js.map