import {Store} from "redux";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {
    AppServices,
    AppServicesFactory,
    AppPresetServices,
    AppPresetServicesFactory
} from "./AppServices";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";

export class ProdAppPresetServicesFactory implements AppPresetServicesFactory {
    create(_: Store): AppPresetServices {
        return {};
    }
}

export class ProdAppServicesFactory implements AppServicesFactory {
    create(presetServices: AppPresetServices, store: Store): AppServices {
        let partialAppServices = {...presetServices};
        partialAppServices = {...partialAppServices, commandBus: createCommandBus(partialAppServices, store)};
        partialAppServices = {...partialAppServices, eventBus: createEventBus(partialAppServices, store)};
        partialAppServices = {...partialAppServices, toaster: createToaster(partialAppServices)};

        //@ts-ignore
        return partialAppServices;
    }
}

function createToaster(presetServices: AppPresetServices): Toaster {
    if(presetServices.toaster) {
        return presetServices.toaster;
    }
    const eventBus = presetServices.eventBus;
    if(!eventBus) {
        throw new Error('eventBus must already be initialized!');
    }
    return new Toaster(eventBus);
}

function createCommandBus(presetServices: AppPresetServices, store: Store): CommandBus {
    if(presetServices.commandBus) {
        return presetServices.commandBus;
    }
    return new CommandBus(store.dispatch);
}

function createEventBus(presetServices: AppPresetServices, store: Store): EventBus {
    if(presetServices.eventBus) {
        return presetServices.eventBus;
    }
    return new EventBus(store.dispatch);
}