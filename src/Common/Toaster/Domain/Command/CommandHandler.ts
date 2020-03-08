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

    getSupportedCommandTypeIds(): string[] {
        return [
            CommandTypeIds.ADD_TOAST_MESSAGE,
            CommandTypeIds.REMOVE_TOAST_MESSAGE,
            CommandTypeIds.REMOVE_TOAST,
            CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING,
        ];
    }

    handle(command: ToastCommands): void {
        if(command.typeId === CommandTypeIds.ADD_TOAST_MESSAGE) {
            this.toaster.addToastMessage({
                type: command.payload.type,
                content: command.payload.content,
            });
            return;
        }
        if(command.typeId === CommandTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
            this.toaster.blockToastForMessageReceiving(command.payload.toastId);
            return;
        }
        if(command.typeId === CommandTypeIds.REMOVE_TOAST) {
            this.toaster.removeToast(command.payload.toastId);
            return;
        }
        if(command.typeId === CommandTypeIds.REMOVE_TOAST_MESSAGE) {
            this.toaster.removeToastMessage(command.payload.toastId, command.payload.messageId);
            return;
        }
    }
}

type ToastCommands = (AddToastMessage | BlockToastForMessageReceiving | RemoveToast | RemoveToastMessage);

export enum CommandTypeIds {
    ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST = 'REMOVE_TOAST-804a1c85-690e-468f-bde7-74a2864bc11c',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
}