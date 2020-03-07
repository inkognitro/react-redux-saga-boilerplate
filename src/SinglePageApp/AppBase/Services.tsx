import {Store} from 'redux'
import {ServicesFactory} from "Common/AppBase/ActionListener";
import {Toaster} from "Common/Toaster/Domain/Toaster";

export type AppServices = {
    toaster: Toaster,
};

export class AppServicesFactory implements ServicesFactory<AppServices> {
    create(store: Store): AppServices {
        return {
            toaster: new Toaster(store.dispatch),
        };
    }
}