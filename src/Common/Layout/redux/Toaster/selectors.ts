import {CommonToastIds, Toast, ToastTypes} from "Common/Layout/redux/Toaster/types";
import {RootState} from "MainApp/App";

//todo: use reselect library for performance optimization

export function findToastById(state: RootState, toastId: string): (null | Toast) {
    const toast = state.toaster.toasts.find((toast) => (toast.id === toastId));
    if(!toast) {
        return null;
    }
    return toast;
}

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

export function getToasts(state: RootState): Toast[] {
    return state.toaster.toasts;
}