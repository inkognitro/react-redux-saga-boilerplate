import {ToastTypes} from "Common/Toaster/Domain/Types";
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

enum CommonToastIds {
    INFO = '5011d2e7-ce60-4186-bbee-bf3e8ab57c3b',
    SUCCESS = 'fb02626d-b3f7-4589-b880-ae468d763f7f',
    WARNING = '9210671f-37da-4258-90e5-dc6faf6ba87a',
    ERROR = '3fd1b7de-cf2e-49ba-bda3-fcde9e0632bd',
}

function getCommonToastIdByType(type: ToastTypes): string {
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
    throw new Error('toast type "' + type + '" not supported');
}