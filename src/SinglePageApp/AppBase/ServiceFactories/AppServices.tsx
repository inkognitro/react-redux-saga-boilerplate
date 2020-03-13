import {PresetServicesFactory, ServicesFactory} from "Common/AppBase/ActionListener";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type AppPresetServices = {
    toaster?: Toaster,
};

export type AppServices = {
    toaster: Toaster,
};

export interface AppServicesFactory extends ServicesFactory<AppPresetServices, AppServices> {}
export interface AppPresetServicesFactory extends PresetServicesFactory<AppPresetServices> {}