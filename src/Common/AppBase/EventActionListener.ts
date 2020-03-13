import {ActionListener, ListenerActionTypes} from "./ActionListener";
import {Event, EventAction} from "Common/AppBase/EventBus";

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