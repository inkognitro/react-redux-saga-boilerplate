import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from './App';
import {
    DevPresetServicesFactory,
    DevAppServicesFactory
} from "./AppBase/ServiceFactories/DevAppServicesFactory";
import {createStore} from "./AppBase/Store";
const HotReloadedApp = hot(RootComponent);

const presetServicesFactory = new DevPresetServicesFactory();
const servicesFactory = new DevAppServicesFactory();
const store = createStore(presetServicesFactory, servicesFactory);

const appContainer = document.getElementById('app');
render(<HotReloadedApp store={store} />, appContainer);
