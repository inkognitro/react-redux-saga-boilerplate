import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from 'SinglePageApp/App';
import {
    DevPresetServicesFactory,
    DevAppServicesFactory
} from "SinglePageApp/AppBase/ServiceFactories/DevAppServicesFactory";
import {createStore} from "SinglePageApp/AppBase/Store";
const HotReloadedApp = hot(RootComponent);

const presetServicesFactory = new DevPresetServicesFactory();
const servicesFactory = new DevAppServicesFactory();
const store = createStore(presetServicesFactory, servicesFactory);

const appContainer = document.getElementById('app');
render(<HotReloadedApp store={store} />, appContainer);
