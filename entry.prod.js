import React from 'react';
import {render as renderReactApp} from 'react-dom'
import App from 'App/App';

const appContainer = document.getElementById('app');
renderReactApp(<App />, appContainer);