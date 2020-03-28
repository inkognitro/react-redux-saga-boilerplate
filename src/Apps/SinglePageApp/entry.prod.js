import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from './App';
import {createStore, browserHistory} from "./Bootstrap/Store";

const store = createStore();
const appContainer = document.getElementById('app');
render(<RootComponent history={browserHistory} store={store} />, appContainer);