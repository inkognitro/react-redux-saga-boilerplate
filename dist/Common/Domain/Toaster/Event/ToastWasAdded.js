"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createToastWasAdded(toast) {
    return {
        type: Types_1.ToasterEventTypes.TOAST_WAS_ADDED,
        payload: {
            toast: toast,
        }
    };
}
exports.createToastWasAdded = createToastWasAdded;
//# sourceMappingURL=ToastWasAdded.js.map