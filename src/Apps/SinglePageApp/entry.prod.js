import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from './App';
import {ProdAppServicesFactory, prodPresetServices} from "./AppBase/ServiceFactories/ProdAppServicesFactory";
import {createStore} from "./AppBase/Store";

const servicesFactory = new ProdAppServicesFactory();
const store = createStore(servicesFactory, prodPresetServices);

const appContainer = document.getElementById('app');
render(<RootComponent history={prodPresetServices.history} store={store} />, appContainer);