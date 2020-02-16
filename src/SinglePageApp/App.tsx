import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Domain/HttpRequestHandling/Reducer';
import {auth} from 'Common/Auth/Domain/Reducer';
import {toaster} from 'Common/Toaster/Domain/Reducer';
import {cache} from './EntityCache/Domain/Reducer';
import thunkMiddleware from 'redux-thunk';
import {Toaster} from "SinglePageApp/Layout/UI/Toaster";
import 'SinglePageApp/App.scss';
import {Loader} from "SinglePageApp/Layout/UI/Loader";
import {Router} from 'SinglePageApp/Routing/UI/Router';

const root = combineReducers({requestHandling, auth, cache, toaster});
export type RootState = ReturnType<typeof root>;

const middleware = applyMiddleware(thunkMiddleware);

export const store = createStore(root, middleware);

export class RootComponent extends Component {
    componentDidMount() {
        //todo: initialize current user
        //todo: initialize refresh token interval!
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
                <Toaster />
                <Loader httpRequestHandler={} />
            </Provider>
        );
    }
}