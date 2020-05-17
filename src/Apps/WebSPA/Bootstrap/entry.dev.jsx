import React from 'react';
import { render } from 'react-dom'
import { hot } from 'react-hot-loader/root';
import { MockHttpRequestDispatcher } from "../../../Packages/Common/Infrastructure/RequestHandling/MockHttpRequestDispatcher";
import { RootComponent } from '../App';
import { createDevAppServices, createHotReloadedDevAppServices } from "./ServicesFactory";

const HotReloadedApp = hot(RootComponent);

const httpRequestDispatcher = new MockHttpRequestDispatcher();
const appServices = (module.hot
    ? createHotReloadedDevAppServices(httpRequestDispatcher)
    : createDevAppServices(httpRequestDispatcher)
);

render(
    <HotReloadedApp history={appServices.history} store={appServices.store} />,
    document.getElementById('app'),
);
