import {Store} from "redux";
import {AppServices, AppServicesFactory} from "./AppServices";
import {ProdAppServicesFactory, prodPresetServices} from "./ProdAppServicesFactory";

export const devPresetServices: Partial<AppServices> = prodPresetServices;

export class DevAppServicesFactory implements AppServicesFactory {
    create(presetServices: Partial<AppServices>, store: Store): AppServices {
        const prodAppServicesFactory = new ProdAppServicesFactory();
        return prodAppServicesFactory.create(presetServices, store);
    }
}