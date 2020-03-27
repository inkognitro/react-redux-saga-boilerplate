import {Action} from "redux";
import {ListenerActionTypes} from "Common/Bootstrap/Action";

export function createEventAction(event: Event): EventAction {
    return {
        type: ListenerActionTypes.EVENT,
        event: event,
    };
}

export type EventAction = (Action & {
    event: Event
});

export type Event<Type = any, Payload = any> = (Action<Type> & {
    payload: (undefined | Payload)
});