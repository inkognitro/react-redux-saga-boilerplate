import {Dispatch} from "redux";
import {Event} from "Common/Bootstrap/Event";


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