import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {CommandAction, createCommandAction} from "Common/AppBase/CommandActionListener";

export function handleAddToastMessage(toaster: Toaster, action: AddToastMessage): void {
    toaster.addToastMessage({
        type: action.payload.type,
        content: action.payload.content,
    });
}

export function createAddToastMessageCommandAction(settings: CreateAddToastMessageSettings): CommandAction {
    const command = {
        typeId: CommandTypeIds.ADD_TOAST_MESSAGE,
        payload: settings,
    };
    return createCommandAction(command);
}

export type AddToastMessage = {
    typeId: CommandTypeIds.ADD_TOAST_MESSAGE,
    payload: CreateAddToastMessageSettings
};

type CreateAddToastMessageSettings = {
    type: ToastTypes,
    content: string,
};