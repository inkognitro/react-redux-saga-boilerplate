import {Store} from "redux";
import {AppServices, AppServicesFactory, PresetAppServices} from "SinglePageApp/AppBase/ServiceComposition/AppServices";
import {ProdAppServicesFactory} from "SinglePageApp/AppBase/ServiceComposition/ProdAppServicesFactory";

export class DevAppServicesFactory implements AppServicesFactory {
    create(presetServices: PresetAppServices, store: Store): AppServices {
        const prodAppServicesFactory = new ProdAppServicesFactory();
        return prodAppServicesFactory.create(presetServices, store);
    }
}

export function createPresetAppServices(): PresetAppServices {
    return {};
}