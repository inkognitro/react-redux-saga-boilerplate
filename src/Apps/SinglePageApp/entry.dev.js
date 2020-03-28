import React from 'react';
import {render} from 'react-dom'
import { hot } from 'react-hot-loader/root';
import {RootComponent} from './App';
import {browserHistory, createStore} from "./Bootstrap/Store";
const HotReloadedApp = hot(RootComponent);

const store = createStore();
const appContainer = document.getElementById('app');
render(<HotReloadedApp history={browserHistory} store={store} />, appContainer);
