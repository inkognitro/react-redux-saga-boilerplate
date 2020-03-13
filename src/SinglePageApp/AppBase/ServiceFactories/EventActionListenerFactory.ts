import {ActionListener, ActionListenerFactory} from "Common/AppBase/ActionListener";
import {AppServices} from "SinglePageApp/AppBase/ServiceFactories/AppServices";
import {EventActionListener, EventListener} from "Common/AppBase/EventActionListener";

export class EventActionListenerFactory implements ActionListenerFactory<AppServices> {
    public create(services: AppServices): ActionListener {
        return new EventActionListener(createEventListeners(services));
    }
}

function createEventListeners(_: AppServices): EventListener[] {
    return [];
}