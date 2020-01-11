import React from 'react';
import {render as renderReactApp} from 'react-dom'
import {RootComponent} from 'MainApp/App';

const appContainer = document.getElementById('app');
renderReactApp(<RootComponent />, appContainer);