import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from './App';
import {createAppServices} from "./ServicesFactory";
import {AxiosHttpRequestDispatcher} from "Common/Infrastructure/RequestHandling/AxiosHttpRequestDispatcher";

const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
appServices.sagaMiddleware.run(appServices.rootSaga);

render(
    <RootComponent history={browserHistory} store={store} />,
    document.getElementById('app')
);