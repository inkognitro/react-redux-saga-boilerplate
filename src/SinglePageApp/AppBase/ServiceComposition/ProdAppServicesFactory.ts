import {Store} from "redux";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {AppServices, AppServicesFactory, PresetAppServices} from "SinglePageApp/AppBase/ServiceComposition/AppServices";

export class ProdAppServicesFactory implements AppServicesFactory {
    create(presetServices: PresetAppServices, store: Store): AppServices {
        return {
            toaster: createToaster(presetServices, store),
        };
    }
}

export function createPresetAppServices(): PresetAppServices {
    return {};
}

function createToaster(presetServices: PresetAppServices, store: Store): Toaster {
    if(presetServices.toaster) {
        return presetServices.toaster;
    }
    return new Toaster(store.dispatch);
}