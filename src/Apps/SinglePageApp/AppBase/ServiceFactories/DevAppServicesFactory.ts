import {Store} from "redux";
import {
    AppPresetServices,
    AppPresetServicesFactory,
    AppServices,
    AppServicesFactory
} from "./AppServices";
import {ProdAppServicesFactory} from "./ProdAppServicesFactory";

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