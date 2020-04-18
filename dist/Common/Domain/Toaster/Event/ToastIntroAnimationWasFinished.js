"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
function createToastIntroAnimationWasFinished(toastId) {
    return {
        type: Types_1.ToasterEventTypes.TOAST_INTRO_ANIMATION_WAS_FINISHED,
        payload: {
            toastId: toastId,
        }
    };
}
exports.createToastIntroAnimationWasFinished = createToastIntroAnimationWasFinished;
//# sourceMappingURL=ToastIntroAnimationWasFinished.js.map