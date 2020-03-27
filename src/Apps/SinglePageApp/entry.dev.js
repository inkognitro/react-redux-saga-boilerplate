import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from './App';
import {DevAppServicesFactory, devPresetServices} from "./AppBase/ServiceFactories/DevAppServicesFactory";
import {createStore} from "./AppBase/Store";
const HotReloadedApp = hot(RootComponent);

const servicesFactory = new DevAppServicesFactory();
const store = createStore(servicesFactory, devPresetServices);

const appContainer = document.getElementById('app');
render(<HotReloadedApp history={devPresetServices.history} store={store} />, appContainer);
