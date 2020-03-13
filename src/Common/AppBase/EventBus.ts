import {Action, Dispatch} from "redux";
import {ListenerActionTypes} from "Common/AppBase/ActionListener";
import {Command, CommandAction} from "Common/AppBase/CommandBus";

export type Event<Type = any, Payload = any> = (Action<Type> & {
    payload: Payload
});

export type EventAction = (Action & {
    event: Event
});


export function createEventAction(command: Command): CommandAction {
    return {
        type: ListenerActionTypes.EVENT,
        command: command,
    };
}

export interface EventBus {
    handle(event: Event): void
}

export class EventBus implements EventBus {
    private readonly dispatch: Dispatch;

    constructor(dispatch: Dispatch) {
        this.dispatch = dispatch;
    }

    handle(event: Event): void {
        this.dispatch(event);
    }
}