import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from '../App';
import {createAppServices} from "../ServicesFactory";
import {AxiosHttpRequestDispatcher} from "Common/Infrastructure/RequestHandling/AxiosHttpRequestDispatcher";

const httpRequestDispatcher = new AxiosHttpRequestDispatcher();
const appServices = createAppServices(httpRequestDispatcher);
render(
    <RootComponent history={appServices.history} store={appServices.store} />,
    document.getElementById('app')
);