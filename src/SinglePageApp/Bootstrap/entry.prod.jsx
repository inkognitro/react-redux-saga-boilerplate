import React from 'react';
import { render } from 'react-dom'
import { AxiosHttpRequestDispatcher } from "../../Common/Infrastructure/RequestHandling/AxiosHttpRequestDispatcher";
import { RootComponent } from '../App';
import { createAppServices } from "./ServicesFactory";

const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
render(
    <RootComponent history={appServices.history} store={appServices.store} />,
    document.getElementById('app'),
);
