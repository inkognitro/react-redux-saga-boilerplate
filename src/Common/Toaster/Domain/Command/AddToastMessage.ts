import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";
import {CommandAction, createCommandAction} from "Common/AppBase/CommandActionListener";

export function createAddToastMessageCommandAction(settings: CreateAddToastMessageSettings): CommandAction {
    const command: AddToastMessage = {
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