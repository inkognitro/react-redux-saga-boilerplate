import {Action} from "redux";

export type EventAction = (Action & {
    event: Event
});

export type Event<Type = any, Payload = undefined> = (Action<Type> & {
    payload: Payload
});