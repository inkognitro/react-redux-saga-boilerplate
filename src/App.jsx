import React from 'react';
import {Provider} from "react-redux";
import {store} from 'App/Redux/AppRedux'
import Home from "App/Components/RouteViews/Home/Home";

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