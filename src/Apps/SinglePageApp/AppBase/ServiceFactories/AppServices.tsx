import {PresetServicesFactory, ServicesFactory} from "Common/AppBase/ActionListener";
import {Toaster} from "Common/Toaster/Domain/Toaster";
import {CommandBus} from "Common/AppBase/CommandBus";
import {EventBus} from "Common/AppBase/EventBus";

export type AppServices = {
    commandBus: CommandBus,
    eventBus: EventBus
    toaster: Toaster,
};
export type AppPresetServices = Partial<AppServices>;
export interface AppServicesFactory extends ServicesFactory<AppPresetServices, AppServices> {}
export interface AppPresetServicesFactory extends PresetServicesFactory<AppPresetServices> {}