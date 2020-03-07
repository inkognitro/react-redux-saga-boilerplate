import {Command, createCommand} from "Common/../../../../AppBase/Bus/CommandListenerMiddleware";
import {CommandTypeIds} from "Common/Toaster/Domain/Command/CommandHandler";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type RemoveToastAction = {
    type: CommandTypeIds.REMOVE_TOAST,
    payload: {
        toastId: string,
    }
};

export function createRemoveToastCommand(toastId: string): Command<RemoveToastAction> {
    return createCommand({
        type: CommandTypeIds.REMOVE_TOAST,
        payload: {
            toastId: toastId
        }
    });
}

export function handleRemoveToast(toaster: Toaster, action: RemoveToastAction): void {
    toaster.removeToast(action.payload.toastId);
}