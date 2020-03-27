import {ServicesFactory} from "Common/AppBase/ActionListener";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";
import {History} from "history";
import {Router} from "Common/Routing/Domain/Router";

export type AppServices = {
    history: History,
    commandBus: CommandBus,
    eventBus: EventBus
    toaster: Toaster,
    router: Router,
};

export interface AppServicesFactory extends ServicesFactory<AppServices> {}