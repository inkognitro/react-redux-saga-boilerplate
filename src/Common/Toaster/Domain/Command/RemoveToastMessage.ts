import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";
import {Command, createCommand} from "Common/../../../../AppBase/Bus/CommandListenerMiddleware";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type RemoveToastMessageAction = {
    type: CommandTypeIds.REMOVE_TOAST_MESSAGE,
    payload: {
        toastId: string,
        messageId: string,
    }
};

export function createRemoveToastMessageCommand(toastId: string, messageId: string): Command<RemoveToastMessageAction> {
    return createCommand({
        type: CommandTypeIds.REMOVE_TOAST_MESSAGE,
        payload: {
            toastId: toastId,
            messageId: messageId,
        }
    });
}

export function handleRemoveToastMessage(toaster: Toaster, action: RemoveToastMessageAction): void {
    toaster.removeToastMessage(action.payload.toastId, action.payload.messageId);
}