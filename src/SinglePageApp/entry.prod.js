import React from 'react';
import {render} from 'react-dom'
import {createProdAppServices} from 'SinglePageApp/AppBase/Services';
import {RootComponent} from 'SinglePageApp/App';

const appContainer = document.getElementById('app');
render(<RootComponent services={createProdAppServices()} />, appContainer);