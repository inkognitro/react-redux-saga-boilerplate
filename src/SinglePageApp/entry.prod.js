import React from 'react';
import {render} from 'react-dom'
import {services} from 'SinglePageApp/ProdServices';
import {RootComponent} from 'SinglePageApp/App';

const appContainer = document.getElementById('app');
render(<RootComponent services={services} />, appContainer);