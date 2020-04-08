import {Action} from "redux";

export type Event<Type = any, Payload = undefined> = (Action<Type> & {
    payload: Payload
});