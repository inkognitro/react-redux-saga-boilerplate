import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/Application/RequestHandling/Redux/Reducer';
import {auth} from 'Common/Application/Auth/Redux/Reducer';
import {toaster} from 'Common/Application/Layout/Redux/Toaster/Reducer';
import {cache} from 'SinglePageApp/../Common/Application/EntityCache/Redux/Reducer';
import thunkMiddleware from 'redux-thunk';
import {initializeAuth} from "Common/Application/Auth/Redux/Actions";
import {Toaster} from "SinglePageApp/Layout/Components/Toaster";
import 'SinglePageApp/App.scss';
import {Loader} from "SinglePageApp/Layout/Components/Loader";
import {Router} from 'SinglePageApp/Routing/Components/Router';

const root = combineReducers({requestHandling, auth, cache, toaster});
export type RootState = ReturnType<typeof root>;

const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(root, middleware);

function getAuthState() {
    return store.getState().auth;
}

export class RootComponent extends Component {
    componentDidMount() {
        // @ts-ignore
        store.dispatch(initializeAuth(getAuthState));
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
                <Toaster />
                <Loader />
            </Provider>
        );
    }
}