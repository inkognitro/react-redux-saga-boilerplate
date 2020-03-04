import {AppDispatch} from "Common/types";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Selectors";
import {Toast, ToasterState, ToastTypes} from "Common/Toaster/Domain/Types";

export type AddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};

export interface ToastRepositoryInterface {
    getCommonToastIdByType(type: ToastTypes): string
    findAll(): Toast[]
    addToastMessage(settings: AddToastMessageSettings): void
    removeToast(toastId: string): void
    blockToastForMessageReceiving(toastId: string): void
    removeToastMessage(toastId: string, toastMessageId: string): void
}

export type ToasterStateSelector = () => ToasterState;

export class ToastRepository implements ToastRepositoryInterface {

    private readonly dispatch: AppDispatch;
    private readonly getToasterState: ToasterStateSelector;

    constructor(dispatch: AppDispatch, getToasterState: ToasterStateSelector) {
        this.dispatch = dispatch;
        this.getToasterState = getToasterState;
    }

    findAll(): Toast[] {

    }

    addToastMessage(settings: AddToastMessageSettings): void {

    }

    removeToast(toastId: string): void {

    }

    blockToastForMessageReceiving(toastId: string): void {

    }

    removeToastMessage(toastId: string, toastMessageId: string): void {

    }
}


