import {ServicesFactory} from "Common/AppBase/ActionListener";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type PresetAppServices = {
    toaster?: Toaster,
};

export type AppServices = {
    toaster: Toaster,
};

export interface AppServicesFactory extends ServicesFactory<PresetAppServices, AppServices> {}