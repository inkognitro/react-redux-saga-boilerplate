import {Component} from 'react';
import {render as renderReactApp} from 'react-dom'

class App extends Component {
    render() {
        return "test ok";
    }
}

const appContainer = document.getElementById('app');
renderReactApp(<App />, appContainer);
