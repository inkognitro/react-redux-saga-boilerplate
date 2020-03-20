import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from './App';
import {
    ProdAppPresetServicesFactory,
    ProdAppServicesFactory
} from "./AppBase/ServiceFactories/ProdAppServicesFactory";
import {createStore} from "./AppBase/Store";

const presetServicesFactory = new ProdAppPresetServicesFactory();
const servicesFactory = new ProdAppServicesFactory();
const store = createStore(presetServicesFactory, servicesFactory);

const appContainer = document.getElementById('app');
render(<RootComponent store={store} />, appContainer);