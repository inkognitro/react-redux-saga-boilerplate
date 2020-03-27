import {Action} from "redux";
import {ListenerActionTypes} from "Common/Bootstrap/Action";

export function createCommandAction(command: Command): CommandAction {
    return {
        type: ListenerActionTypes.COMMAND,
        command: command,
    };
}

export type CommandAction = (Action & {
    command: Command
});

export type Command<Type = any, Payload = any> = (Action<Type> & {
    payload: (undefined | Payload)
});