import {Dispatch} from 'redux';
import {ToastTypes} from "Common/Toaster/Domain/Types";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Query";
import {createMessageWasAddedToPipeline} from "Common/Toaster/Domain/Event/MessageWasAddedToPipeline";
import {createMessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Event/MessageWasMovedFromPipelineToToast";
import {createToastWasBlockedForMessageReceiving} from "Common/Toaster/Domain/Event/ToastWasBlockedForMessageReceiving";
import {createToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";
import {createToastWasRemoved} from "Common/Toaster/Domain/Event/ToastWasRemoved";

type AddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};

export class Toaster {
    private readonly dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    public addToastMessage(settings: AddToastMessageSettings): void {
        const toastId = getCommonToastIdByType(settings.type);
        this.dispatch(createMessageWasAddedToPipeline(toastId, settings.type, settings.content));
        const waitingTimeForOtherToastMessagesInMs = 200;
        setTimeout(
            () => this.dispatch(createMessageWasMovedFromPipelineToToast(toastId)),
            waitingTimeForOtherToastMessagesInMs
        );
    }

    public removeToast(toastId: string): void {
        this.dispatch(createToastWasRemoved(toastId));
    }

    public blockToastForMessageReceiving(toastId: string): void {
        this.dispatch(createToastWasBlockedForMessageReceiving(toastId));
    }

    public removeToastMessage(toastId: string, toastMessageId: string): void {
        this.dispatch(createToastMessageWasRemoved(toastId, toastMessageId));
    }
}