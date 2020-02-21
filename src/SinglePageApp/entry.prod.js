import React from 'react';
import {render} from 'react-dom'
import {RootComponent} from 'SinglePageApp/App';

const appContainer = document.getElementById('app');
render(<RootComponent />, appContainer);