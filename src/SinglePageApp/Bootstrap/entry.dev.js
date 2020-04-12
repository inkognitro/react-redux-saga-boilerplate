import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from '../App';
import {createAppServices, createHotReloadedAppServices} from "./ServicesFactory";
import {MockHttpRequestDispatcher} from "Common/Infrastructure/RequestHandling/MockHttpRequestDispatcher";
const HotReloadedApp = hot(RootComponent);

const httpRequestDispatcher = new MockHttpRequestDispatcher();
const appServices = (module.hot ? createHotReloadedAppServices(httpRequestDispatcher) : createAppServices(httpRequestDispatcher));

render(
    <HotReloadedApp history={appServices.history} store={appServices.store} />,
    document.getElementById('app')
);
