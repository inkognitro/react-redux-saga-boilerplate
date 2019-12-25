import React from 'react';
import {Provider} from 'react-redux';
import {store} from 'App/Redux/root';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import {Home} from 'App/Components/RouteViews/Home';
import {NotFoundError} from 'App/Components/RouteViews/Errors';
import 'App/App.scss';
import {homeRoute} from 'App/Redux/Common/Routing/routes';

//todo: remove allowJs in tsconfig.json after typescript migration has been done

//todo: implement routing

export const App = () => {
    return (
        <Provider store={store}>
            <Router>
                <Switch>
                    <Route exact path={homeRoute.routerUrl} component={Home} />
                    <Route path="*" component={NotFoundError} />
                </Switch>
            </Router>
        </Provider>
    );
};