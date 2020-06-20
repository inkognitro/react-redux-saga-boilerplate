import React from 'react';
import { render } from 'react-dom'
import { RootComponent } from './src/App';
import { createProdAppServices } from "./src/ServicesFactory";

const appServices = createProdAppServices();
render(
    <RootComponent history={appServices.history} store={appServices.store} />,
    document.getElementById('app'),
);
