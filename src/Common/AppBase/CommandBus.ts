import {Action, Dispatch} from "redux";
import {ListenerActionTypes} from "Common/AppBase/ActionListener";

export type Command<Type = any, Payload = any> = (Action<Type> & {
    payload: Payload
});

export type CommandAction = (Action & {
    command: Command
});

export function createCommandAction(command: Command): CommandAction {
    return {
        type: ListenerActionTypes.COMMAND,
        command: command,
    };
}

export interface CommandBus {
    handle(command: Command): void
}

export class CommandBus implements CommandBus {
    private readonly dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    handle(command: Command): void {
        const commandAction = createCommandAction(command);
        this.dispatch(commandAction);
    }
}