import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'App/Redux/root';
import Home from "App/Components/RouteViews/Home/Home";
import 'App/App.scss';

//todo: remove allowJs in tsconfig.json after typescript migration has been done

//todo: implement routing

export const App = () => {
    return (
        <Provider store={store}>
            <Home/>
        </Provider>
    );
};