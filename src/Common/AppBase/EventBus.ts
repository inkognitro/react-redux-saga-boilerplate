import {Action, Dispatch} from "redux";

export type Event<Type = any, Payload = any> = (Action<Type> & {
    payload: Payload
});

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