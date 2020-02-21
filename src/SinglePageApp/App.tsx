import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Domain/HttpRequestHandling/Reducer';
import {auth} from 'Common/Auth/Domain/Reducer';
import {toaster} from 'Common/Toaster/Domain/Reducer';
import {cache} from './EntityCache/Domain/Reducer';
import thunkMiddleware from 'redux-thunk';
import {Toaster} from "Common/Toaster/UI/Toaster";
import {Router} from 'SinglePageApp/Routing/UI/Router';
import {
    HttpRequestManager,
    HttpRequestManagerInterface
} from "Common/RequestHandling/Domain/HttpRequestHandling/HttpRequestManager";
import 'SinglePageApp/App.scss';
import {AxiosRequestDispatcher} from "Common/RequestHandling/Infrastructure/AxiosRequestDispatcher";
import {ToastRepository, ToastRepositoryInterface} from "Common/Toaster/Domain/ToastRepository";
import {Loader} from "SinglePageApp/Layout/UI/Loader";

const root = combineReducers({requestHandling, auth, cache, toaster});
export type RootState = ReturnType<typeof root>;
export const store = createStore(root, applyMiddleware(thunkMiddleware));

const httpRequestManager: HttpRequestManagerInterface = new HttpRequestManager(
    () => store.getState().requestHandling,
    store.dispatch,
    new AxiosRequestDispatcher()
);

const toastRepository: ToastRepositoryInterface = new ToastRepository(
    store.dispatch,
    () => store.getState().toaster
);

export class RootComponent extends Component {
    componentDidMount() {
        //todo: initialize current user
        //todo: initialize refresh token interval!
    }

    render() {
        return (
            <Provider store={store}>
                <Router />
                <Toaster toastRepository={toastRepository} />
                <Loader httpRequestManager={httpRequestManager} />
            </Provider>
        );
    }
}