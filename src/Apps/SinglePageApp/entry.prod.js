import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from './App';
import {createAppServices} from "./Bootstrap/AppServicesFactory";
import {AxiosHttpRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosHttpRequestDispatcher";

const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
appServices.sagaMiddleware.run(appServices.rootSaga);

render(
    <RootComponent history={browserHistory} store={store} />,
    document.getElementById('app')
);