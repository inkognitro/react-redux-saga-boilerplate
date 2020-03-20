import {ToastTypes} from "Common/Toaster/Domain/Types";
import {CommandTypes} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, CommandAction, createCommandAction} from "Common/AppBase/CommandBus";

export function createAddToastMessageAction(settings: Payload): CommandAction {
    const command: AddToastMessage = {
        type: CommandTypes.ADD_TOAST_MESSAGE,
        payload: settings,
    };
    return createCommandAction(command);
}

export type AddToastMessage = Command<CommandTypes.ADD_TOAST_MESSAGE, Payload>;

type Payload = {
    type: ToastTypes,
    content: string,
};