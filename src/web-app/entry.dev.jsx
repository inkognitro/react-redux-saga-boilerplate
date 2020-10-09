import React from 'react';
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root';
import { RootComponent } from 'web-app/app';
import { createDevAppServices, createHotReloadedDevAppServices } from "web-app/services.factory";

const HotReloadedApp = hot(RootComponent);

const appServices = (module.hot
    ? createHotReloadedDevAppServices()
    : createDevAppServices()
);

render(<HotReloadedApp services={appServices} />, document.getElementById('app'));
