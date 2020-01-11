import {CommonToastIds, Toast, ToasterState, ToastTypes} from "Common/Layout/Redux/Toaster/Types";

//todo: use reselect library for performance optimization

export function getCommonToastIdByType(type: ToastTypes): string {
    if(type === ToastTypes.INFO) {
        return CommonToastIds.INFO;
    }
    if(type === ToastTypes.SUCCESS) {
        return CommonToastIds.SUCCESS;
    }
    if(type === ToastTypes.WARNING) {
        return CommonToastIds.WARNING;
    }
    if(type === ToastTypes.ERROR) {
        return CommonToastIds.ERROR;
    }
    throw new Error('toast type "' + type + '" not supported');
}

export function getToasts(state: ToasterState): Toast[] {
    return state.toasts;
}