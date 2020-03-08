import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from 'SinglePageApp/App';
import {
    createPresetAppServices,
    ProdAppServicesFactory
} from "SinglePageApp/AppBase/ServiceComposition/ProdAppServicesFactory";
import {createStore} from "SinglePageApp/AppBase/Store";

const presetServices = createPresetAppServices();
const servicesFactory = new ProdAppServicesFactory();
const store = createStore(presetServices, servicesFactory);

const appContainer = document.getElementById('app');
render(<RootComponent store={store} />, appContainer);