import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandTypes} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/Bootstrap/Command";

export function createAddToastMessageAction(settings: Payload): CommandAction {
    return createCommandAction(createAddToastMessage(settings));
}

export function createAddToastMessage(settings: Payload): AddToastMessage {
    return {
        type: CommandTypes.ADD_TOAST_MESSAGE,
        payload: settings,
    };
}

export type AddToastMessage = Command<CommandTypes.ADD_TOAST_MESSAGE, Payload>;

type Payload = {
    type: ToastTypes,
    content: string,
};