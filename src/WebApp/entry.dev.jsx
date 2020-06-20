import React from 'react';
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root';
import { RootComponent } from './src/App';
import { createDevAppServices, createHotReloadedDevAppServices } from "./src/ServicesFactory";

const HotReloadedApp = hot(RootComponent);

const appServices = (module.hot
    ? createHotReloadedDevAppServices()
    : createDevAppServices()
);

render(
    <HotReloadedApp history={appServices.history} store={appServices.store} />,
    document.getElementById('app'),
);
