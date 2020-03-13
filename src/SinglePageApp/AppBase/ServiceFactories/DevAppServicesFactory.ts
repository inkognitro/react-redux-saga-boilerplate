import {Store} from "redux";
import {
    AppPresetServices,
    AppPresetServicesFactory,
    AppServices,
    AppServicesFactory
} from "SinglePageApp/AppBase/ServiceFactories/AppServices";
import {ProdAppServicesFactory} from "SinglePageApp/AppBase/ServiceFactories/ProdAppServicesFactory";

export class DevPresetServicesFactory implements AppPresetServicesFactory {
    create(_: Store): AppPresetServices {
        return {};
    }
}

export class DevAppServicesFactory implements AppServicesFactory {
    create(presetServices: AppPresetServices, store: Store): AppServices {
        const prodAppServicesFactory = new ProdAppServicesFactory();
        return prodAppServicesFactory.create(presetServices, store);
    }
}