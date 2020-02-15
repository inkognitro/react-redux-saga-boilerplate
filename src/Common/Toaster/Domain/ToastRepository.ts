import {AppDispatch} from "Common/types";
import {ToasterState} from "Common/Toaster/Domain/Types";
import {
    createAddToastMessageThunk,
    createBlockToastForMessageReceivingAction,
    createRemoveToastMessageAction,
    createRemoveToastThunk
} from "Common/Toaster/Domain/Actions";
import {getCommonToastIdByType, getToasts} from "Common/Toaster/Domain/Selectors";

export enum ToastTypes {
    INFO = 'info',
    SUCCESS = 'success',
    WARNING = 'warning',
    ERROR = 'error',
}

export type MessageToAdd = {
    id: string,
    toastId: string,
    type: ToastTypes,
    content: string,
};

export type Message = {
    id: string,
    content: string,
    isIntroAnimationEnabled: boolean,
};

export type Toast = {
    id: string,
    type: ToastTypes,
    messages: Message[],
    canReceiveMessages: boolean,
};

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

    getCommonToastIdByType(type: ToastTypes): string {
        return getCommonToastIdByType(type);
    }

    findAll(): Toast[] {
        return getToasts(this.getToasterState());
    }

    addToastMessage(settings: AddToastMessageSettings): void {
        const thunk = createAddToastMessageThunk(settings);
        this.dispatch(thunk);
    }

    removeToast(toastId: string): void {
        const thunk = createRemoveToastThunk(toastId);
        this.dispatch(thunk);
    }

    blockToastForMessageReceiving(toastId: string): void {
        const action = createBlockToastForMessageReceivingAction(toastId);
        this.dispatch(action);
    }

    removeToastMessage(toastId: string, toastMessageId: string): void {
        const action = createRemoveToastMessageAction(toastId, toastMessageId);
        this.dispatch(action);
    }
}


