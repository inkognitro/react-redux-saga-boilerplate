import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'App/Redux/root';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from 'App/Components/RouteViews/Home';
import {Login} from "App/Components/RouteViews/Auth/Login";
import {NotFoundError} from 'App/Components/RouteViews/Errors';
import {homeRoute, loginRoute} from 'App/Redux/Routing/routes';
import {initializeCurrentUser} from "App/Redux/Auth/actions";
import 'App/App.scss';

export class App extends React.Component {
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
            </Provider>
        );
    }
}