import React from 'react';
import { render } from 'react-dom'
import { RootComponent } from '../App';
import { createProdAppServices } from "./ServicesFactory";

const appServices = createProdAppServices();
render(
    <RootComponent history={appServices.history} store={appServices.store} />,
    document.getElementById('app'),
);
