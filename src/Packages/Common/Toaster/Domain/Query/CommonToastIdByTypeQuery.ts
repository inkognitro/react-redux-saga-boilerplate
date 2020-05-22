import { ToastTypes } from "Packages/Common/Toaster/Domain/Types";

export enum CommonToastIds {
  INFO = "5011d2e7-ce60-4186-bbee-bf3e8ab57c3b",
  SUCCESS = "fb02626d-b3f7-4589-b880-ae468d763f7f",
  WARNING = "9210671f-37da-4258-90e5-dc6faf6ba87a",
  ERROR = "3fd1b7de-cf2e-49ba-bda3-fcde9e0632bd",
}

export function getCommonToastIdByType(type: ToastTypes): string {
    if (type === ToastTypes.INFO) {
        return CommonToastIds.INFO;
    }
    if (type === ToastTypes.SUCCESS) {
        return CommonToastIds.SUCCESS;
    }
    if (type === ToastTypes.WARNING) {
        return CommonToastIds.WARNING;
    }
    if (type === ToastTypes.ERROR) {
        return CommonToastIds.ERROR;
    }
    throw new Error(`toast type "${type}" not supported`);
}
