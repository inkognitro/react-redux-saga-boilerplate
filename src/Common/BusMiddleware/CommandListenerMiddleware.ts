import {Action, Middleware} from "redux";
import {
    ListenerMiddlewareConfiguration,
    createListenerMiddleware as createBasicListenerMiddleware,
    ActionHandlers
} from "Common/BusMiddleware/ListenerMiddleware";

const CommandActionType = 'COMMAND-8ad4cdc4-7498-4187-8f47-4bd19867e3c1';

export type Command<CommandAction> = (Action & {
    commandAction: CommandAction
});

export function createCommand<CommandAction>(action: CommandAction): Command<CommandAction> {
    return {
        type: CommandActionType,
        commandAction: action,
    };
}

export function createListenerMiddleware(actionHandlers: ActionHandlers[]): Middleware {
    const configuration = new ListenerMiddlewareConfiguration(CommandActionType, actionHandlers);
    return createBasicListenerMiddleware(configuration);
}