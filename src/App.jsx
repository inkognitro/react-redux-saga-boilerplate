import React from 'react';
import {Provider} from "react-redux";
import {store} from 'App/AppRedux'
import Home from "App/RouteViews/Home/Home";

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>IMPLEMENT ROUTING HERE!</div>
                <Home />
            </Provider>
        );
    }
}