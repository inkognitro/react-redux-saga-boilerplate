import React from 'react';
import { render } from 'react-dom'
import { RootComponent } from 'web-app/app';
import { createProdAppServices } from "web-app/services.factory";

const appServices = createProdAppServices();
render(<RootComponent services={appServices} />, document.getElementById('app'));
