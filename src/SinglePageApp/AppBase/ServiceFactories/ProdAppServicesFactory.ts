import {Store} from "redux";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {
    AppServices,
    AppServicesFactory,
    AppPresetServices,
    AppPresetServicesFactory
} from "SinglePageApp/AppBase/ServiceFactories/AppServices";

export class ProdAppPresetServicesFactory implements AppPresetServicesFactory {
    create(_: Store): AppPresetServices {
        return {};
    }
}

export class ProdAppServicesFactory implements AppServicesFactory {
    create(presetServices: AppPresetServices, store: Store): AppServices {
        return {
            toaster: createToaster(presetServices, store),
        };
    }
}

function createToaster(presetServices: AppPresetServices, store: Store): Toaster {
    if(presetServices.toaster) {
        return presetServices.toaster;
    }
    return new Toaster(store.dispatch);
}