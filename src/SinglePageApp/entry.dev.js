import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from 'SinglePageApp/App';
import {createDevServices} from 'SinglePageApp/DevServices';
const HotReloadedApp = hot(RootComponent);

const appContainer = document.getElementById('app');
render(<HotReloadedApp services={createDevServices()} />, appContainer);
