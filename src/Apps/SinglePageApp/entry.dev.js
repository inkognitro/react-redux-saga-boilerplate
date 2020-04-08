import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from './App';
import {createAppServices} from "SinglePageApp/Bootstrap/AppServicesFactory";
import {MockHttpRequestDispatcher} from "Common/RequestHandling/Infrastructure/MockHttpRequestDispatcher";
const HotReloadedApp = hot(RootComponent);

const httpRequestDispatcher = new MockHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
appServices.sagaMiddleware.run(appServices.rootSaga);

render(
    <HotReloadedApp history={appServices.history} store={appServices.store} />,
    document.getElementById('app')
);
