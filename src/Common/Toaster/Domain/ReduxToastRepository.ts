import ToastRepository, {AddToastMessageSettings, Toast, ToastTypes} from "Common/Toaster/Application/ToastRepository";
import {AppDispatch} from "Common/types";
import {ToasterState} from "Common/Toaster/Domain/Types";
import {
    createAddToastMessageThunk,
    createBlockToastForMessageReceivingAction, createRemoveToastMessageAction,
    createRemoveToastThunk
} from "Common/Toaster/Domain/Actions";
import {getCommonToastIdByType, getToasts} from "Common/Toaster/Domain/Selectors";

export type ToasterStateSelector = () => ToasterState;

export default class ReduxToastRepository implements ToastRepository {

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


