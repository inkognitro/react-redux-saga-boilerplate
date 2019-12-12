import React from 'react';
import {render as renderReactApp} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {App} from 'App/App';
const HotReloadedApp = hot(App);

const appContainer = document.getElementById('app');
renderReactApp(<HotReloadedApp />, appContainer);
