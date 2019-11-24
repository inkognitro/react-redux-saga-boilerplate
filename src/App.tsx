import React from 'react';
import {Provider} from 'react-redux';
import store from 'App/Redux/store';
import Home from "App/Components/RouteViews/Home/Home";

//todo: install @types/uuid, @types/redux-thunk, uninstall prop-types after js was migrated to ts
//todo: remove allowJs in tsconfig.json

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <div>IMPLEMENT ROUTING HERE!</div>
                <Home/>
            </Provider>
        );
    }
}