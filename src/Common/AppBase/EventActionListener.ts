import {ActionListener} from "./ActionListener";
import {ListenerActionTypes} from "Common/Bootstrap/Action";
import {Event, EventAction} from "Common/Bootstrap/Event";

export interface EventListener {
    getSupportedEventTypes(): string[];
    handle(event: Event): void
}

export class EventActionListener implements ActionListener {
    private readonly eventListeners: EventListener[];

    constructor(commandHandlers: EventListener[]) {
        this.eventListeners = commandHandlers;
    }

    getActionTypesToListen(): string[] {
        return [ListenerActionTypes.EVENT];
    }

    handleAction(action: EventAction): void {
        const event: Event = action.event;
        this.eventListeners.forEach((eventListener) => {
            if(!eventListener.getSupportedEventTypes().includes(event.type)) {
                return;
            }
            eventListener.handle(event);
        });
    }
}