import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Redux/Reducer';
import {auth} from 'Common/Auth/Redux/Reducer';
import {toaster} from 'Common/Layout/Redux/Toaster/Reducer';
import {cache} from 'SinglePageApp/Cache/Redux/Reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {initializeAuth} from "Common/Auth/Redux/Actions";
import {Toaster} from "SinglePageApp/Layout/Components/Toaster";
import 'SinglePageApp/App.scss';
import {Loader} from "SinglePageApp/Layout/Components/Loader";
import {Router} from 'SinglePageApp/Routing/Components/Router';

const root = combineReducers({requestHandling, auth, cache, toaster});
export type RootState = ReturnType<typeof root>;

const middleware = applyMiddleware(thunkMiddleware);
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>> //todo: move middleware application and thunk type to common!

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