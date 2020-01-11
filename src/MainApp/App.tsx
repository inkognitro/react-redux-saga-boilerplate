import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import {requestHandling} from 'Common/RequestHandling/Redux/Reducer';
import {auth} from 'Common/Auth/Redux/Reducer';
import {toaster} from 'Common/Layout/Redux/Toaster/Reducer';
import {cache} from 'MainApp/Cache/Redux/Reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home} from 'MainApp/Routing/Components/Home';
import {Login} from "MainApp/Routing/Components/AuthPages/Login";
import {NotFoundError} from 'MainApp/Routing/Components/ErrorPages/Error404';
import {homeRoute, loginRoute} from 'MainApp/Routing/RouteFactory';
import {initializeCurrentUser} from "Common/Auth/Redux/Actions";
import {Toaster} from "MainApp/Layout/Components/Toaster";
import 'MainApp/App.scss';
import {isRequestRunningWithEnabledLoader} from "Common/RequestHandling/Redux/Selectors";

const root = combineReducers({requestHandling, auth, cache, toaster});
export type RootState = ReturnType<typeof root>;

const middleware = applyMiddleware(thunkMiddleware);
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>> //todo: move middleware application and thunk type to common!

export const store = createStore(root, middleware);

export class RootComponent extends Component {
    componentDidMount(): void {
        // @ts-ignore
        store.dispatch(initializeCurrentUser());
    }

    render() {
        return (
            <Provider store={store}>
                <Router>
                    <Switch>
                        <Route exact path={homeRoute.routerUrl} component={Home}/>
                        <Route exact path={loginRoute.routerUrl} component={Login}/>
                        <Route path="*" component={NotFoundError}/>
                    </Switch>
                </Router>
                <Toaster />
            </Provider>
        );
    }
}