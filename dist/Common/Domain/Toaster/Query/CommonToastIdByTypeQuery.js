"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Types_1 = require("Common/Domain/Toaster/Types");
var CommonToastIds;
(function (CommonToastIds) {
    CommonToastIds["INFO"] = "5011d2e7-ce60-4186-bbee-bf3e8ab57c3b";
    CommonToastIds["SUCCESS"] = "fb02626d-b3f7-4589-b880-ae468d763f7f";
    CommonToastIds["WARNING"] = "9210671f-37da-4258-90e5-dc6faf6ba87a";
    CommonToastIds["ERROR"] = "3fd1b7de-cf2e-49ba-bda3-fcde9e0632bd";
})(CommonToastIds = exports.CommonToastIds || (exports.CommonToastIds = {}));
function getCommonToastIdByType(type) {
    if (type === Types_1.ToastTypes.INFO) {
        return CommonToastIds.INFO;
    }
    if (type === Types_1.ToastTypes.SUCCESS) {
        return CommonToastIds.SUCCESS;
    }
    if (type === Types_1.ToastTypes.WARNING) {
        return CommonToastIds.WARNING;
    }
    if (type === Types_1.ToastTypes.ERROR) {
        return CommonToastIds.ERROR;
    }
    throw new Error('toast type "' + type + '" not supported');
}
exports.getCommonToastIdByType = getCommonToastIdByType;
//# sourceMappingURL=CommonToastIdByTypeQuery.js.map