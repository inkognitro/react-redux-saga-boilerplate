import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from './App';
import {createAppServices} from "./ServicesFactory";
import {MockHttpRequestDispatcher} from "Common/Infrastructure/RequestHandling/MockHttpRequestDispatcher";
const HotReloadedApp = hot(RootComponent);

const httpRequestDispatcher = new MockHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
appServices.sagaMiddleware.run(appServices.rootSaga);

render(
    <HotReloadedApp history={appServices.history} store={appServices.store} />,
    document.getElementById('app')
);
