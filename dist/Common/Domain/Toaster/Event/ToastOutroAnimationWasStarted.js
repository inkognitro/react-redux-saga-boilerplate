"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createToastOutroAnimationWasStarted(toastId) {
    return {
        type: Types_1.ToasterEventTypes.TOAST_OUTRO_ANIMATION_WAS_STARTED,
        payload: {
            toastId: toastId,
        }
    };
}
exports.createToastOutroAnimationWasStarted = createToastOutroAnimationWasStarted;
//# sourceMappingURL=ToastOutroAnimationWasStarted.js.map