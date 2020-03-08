import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from 'SinglePageApp/App';
import {
    createPresetAppServices,
    DevAppServicesFactory
} from "SinglePageApp/AppBase/ServiceComposition/DevAppServicesFactory";
import {createStore} from "SinglePageApp/AppBase/Store";
const HotReloadedApp = hot(RootComponent);

const presetServices = createPresetAppServices();
const servicesFactory = new DevAppServicesFactory();
const store = createStore(presetServices, servicesFactory);

const appContainer = document.getElementById('app');
render(<HotReloadedApp store={store} />, appContainer);
