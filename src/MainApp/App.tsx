import React, {Component} from 'react';
import {Provider} from 'react-redux';
import {Action, applyMiddleware, combineReducers, createStore} from 'redux'
import {auth} from 'Common/Auth/redux/reducer';
import {toaster} from 'Common/Layout/redux/Toaster/reducer';
import {cache} from 'Common/Cache/redux/reducer';
import thunkMiddleware, {ThunkAction} from 'redux-thunk';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import {Home} from 'MainApp/Routing/components/Home';
import {Login} from "MainApp/Routing/components/Auth/Login";
import {NotFoundError} from 'MainApp/Routing/components/Errors';
import {homeRoute, loginRoute} from 'MainApp/Routing/routes';
import {initializeCurrentUser} from "Common/Auth/redux/actions";
import 'MainApp/App.scss';
import {Toaster} from "MainApp/Layout/components/Toaster";

const root = combineReducers({auth, cache, toaster});
export type RootState = ReturnType<typeof root>;

const middleware = applyMiddleware(thunkMiddleware);
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, null, Action<string>>

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