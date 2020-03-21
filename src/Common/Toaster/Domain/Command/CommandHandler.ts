import {AddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {CommandHandler} from "Common/AppBase/CommandActionListener";
import {BlockToastForMessageReceiving} from "Common/Toaster/Domain/Command/BlockToastForMessageReceiving";
import {RemoveToast} from "Common/Toaster/Domain/Command/RemoveToast";
import {RemoveToastMessage} from "Common/Toaster/Domain/Command/RemoveToastMessage";

export class ToasterCommandHandler implements CommandHandler {
    private readonly toaster: Toaster;

    constructor(toaster: Toaster) {
        this.toaster = toaster;
    }

    getSupportedCommandTypes(): string[] {
        return [
            CommandTypes.ADD_TOAST_MESSAGE,
            CommandTypes.REMOVE_TOAST_MESSAGE,
            CommandTypes.REMOVE_TOAST,
            CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        ];
    }

    handle(command: SupportedCommand): void {
        if(command.type === CommandTypes.ADD_TOAST_MESSAGE) {
            this.toaster.addToastMessage({
                type: command.payload.type,
                content: command.payload.content,
            });
            return;
        }
        if(command.type === CommandTypes.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
            this.toaster.blockToastForMessageReceiving(command.payload.toastId);
            return;
        }
        if(command.type === CommandTypes.REMOVE_TOAST) {
            this.toaster.removeToast(command.payload.toastId);
            return;
        }
        if(command.type === CommandTypes.REMOVE_TOAST_MESSAGE) {
            this.toaster.removeToastMessage(command.payload.toastId, command.payload.messageId);
            return;
        }
    }
}

type SupportedCommand = (AddToastMessage | BlockToastForMessageReceiving | RemoveToast | RemoveToastMessage);

export enum CommandTypes {
    ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST = 'REMOVE_TOAST-804a1c85-690e-468f-bde7-74a2864bc11c',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
}