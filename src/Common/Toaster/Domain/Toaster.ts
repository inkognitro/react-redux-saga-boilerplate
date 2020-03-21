import {ToastTypes} from "Common/Toaster/Domain/Types";
import {getCommonToastIdByType} from "Common/Toaster/Domain/Selection";
import {createMessageWasAddedToPipeline} from "Common/Toaster/Domain/Event/MessageWasAddedToPipeline";
import {createMessageWasMovedFromPipelineToToast} from "Common/Toaster/Domain/Event/MessageWasMovedFromPipelineToToast";
import {createToastWasBlockedForMessageReceiving} from "Common/Toaster/Domain/Event/ToastWasBlockedForMessageReceiving";
import {createToastMessageWasRemoved} from "Common/Toaster/Domain/Event/ToastMessageWasRemoved";
import {createToastWasRemoved} from "Common/Toaster/Domain/Event/ToastWasRemoved";
import {EventBus} from "Common/AppBase/EventBus";
import uuidV4 from "uuid/v4";

type AddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};

export class Toaster {
    private readonly eventBus: EventBus;

    constructor(eventBus: EventBus) {
        this.eventBus = eventBus;
    }

    public addToastMessage(settings: AddToastMessageSettings): void {
        const toastId = getCommonToastIdByType(settings.type);
        const messageToAdd = {
            id: uuidV4(),
            toastId: toastId,
            type: settings.type,
            content: settings.content,
        };
        this.eventBus.handle(createMessageWasAddedToPipeline(messageToAdd));
        const waitingTimeForOtherToastMessagesInMs = 200;
        setTimeout(
            () => this.eventBus.handle(createMessageWasMovedFromPipelineToToast(toastId)),
            waitingTimeForOtherToastMessagesInMs
        );
    }

    public removeToast(toastId: string): void {
        this.eventBus.handle(createToastWasRemoved(toastId));
    }

    public blockToastForMessageReceiving(toastId: string): void {
        this.eventBus.handle(createToastWasBlockedForMessageReceiving(toastId));
    }

    public removeToastMessage(toastId: string, toastMessageId: string): void {
        this.eventBus.handle(createToastMessageWasRemoved(toastId, toastMessageId));
    }
}