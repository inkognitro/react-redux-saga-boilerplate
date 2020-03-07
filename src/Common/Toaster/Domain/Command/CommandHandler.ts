import {AddToastMessage} from "Common/Toaster/Domain/Command/AddToastMessage";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {CommandHandler} from "Common/AppBase/CommandActionListener";

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
    }

    /*
    handle(action: ToastCommandAction): void {
        if(action.type === CommandActionTypeIds.REMOVE_TOAST_MESSAGE) {
            handleRemoveToastMessage(this.toaster, action);
            return;
        }

        if(action.type === CommandActionTypeIds.REMOVE_TOAST) {
            handleRemoveToast(this.toaster, action);
            return;
        }

        if(action.type === CommandActionTypeIds.BLOCK_TOAST_FOR_MESSAGE_RECEIVING) {
            handleBlockToastForMessageReceiving(this.toaster, action);
            return;
        }
    }
    */
}

type ToastCommands = (AddToastMessage);

export enum CommandTypeIds {
    ADD_TOAST_MESSAGE = 'ADD_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST = 'REMOVE_TOAST-804a1c85-690e-468f-bde7-74a2864bc11c',
    BLOCK_TOAST_FOR_MESSAGE_RECEIVING = 'BLOCK_TOAST_FOR_MESSAGE_RECEIVING-804a1c85-690e-468f-bde7-74a2864bc11c',
    REMOVE_TOAST_MESSAGE = 'REMOVE_TOAST_MESSAGE-804a1c85-690e-468f-bde7-74a2864bc11c',
}