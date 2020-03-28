import {Action} from "redux";

export type CommandAction = (Action & {
    command: Command
});

export type Command<Type = any, Payload = undefined> = (Action<Type> & {
    payload: Payload
});