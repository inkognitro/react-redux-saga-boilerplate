import React from 'react';
import {render as renderReactApp} from 'react-dom'

class App extends React.Component {
    render() {
        return "test ok";
    }
}

const appContainer = document.getElementById('app');
renderReactApp(<App />, appContainer);
