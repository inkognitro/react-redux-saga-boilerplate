"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createToastWasRemoved(toastId) {
    return {
        type: Types_1.ToasterEventTypes.TOAST_WAS_REMOVED,
        payload: {
            toastId: toastId,
        }
    };
}
exports.createToastWasRemoved = createToastWasRemoved;
//# sourceMappingURL=ToastWasRemoved.js.map