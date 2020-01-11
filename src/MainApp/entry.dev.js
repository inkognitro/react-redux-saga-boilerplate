import React from 'react';
import {render as renderReactApp} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from 'MainApp/App';
const HotReloadedApp = hot(RootComponent);

const appContainer = document.getElementById('app');
renderReactApp(<HotReloadedApp />, appContainer);
