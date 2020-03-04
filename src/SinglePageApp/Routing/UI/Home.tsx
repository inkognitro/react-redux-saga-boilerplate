import React from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {FunctionalLink, Link} from 'Common/Layout/UI/Link/Link';
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {homeRouteUrlSpecification} from "SinglePageApp/Routing/Domain/Routes";
import {RouteSpecification} from "SinglePageApp/Routing/UI/Router";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {TextField} from "Common/Layout/UI/Form/InputElements/TextField";
import {RouteViewComponent} from "Common/Routing/UI/Router";
import {AppServices} from "SinglePageApp/App";
import {ToastTypes} from "Common/Toaster/Domain/Types";

export const routeSpecification: RouteSpecification = {
    urlSpecification: homeRouteUrlSpecification,
    renderComponent: (services: AppServices) => (
        <Home
            initialRouteState={initialRouteState}
            currentRouteManager={services.currentRouteManager}
            authManager={services.authManager}
            getReduxState={() => services.store.getState()}
        />
    )
};

type RouteState = {
    foo: 'bar'
};

const initialRouteState: RouteState = {
    foo: 'bar',
};

export type HomeProps = {
    currentRouteManager: CurrentRouteManagerInterface,
    authManager: AuthManagerInterface,
    getReduxState(): object,
};

class Home extends RouteViewComponent<HomeProps, RouteState> {
    addToast(type: ToastTypes) {
        console.log('add toast: ' + type);
    }

    login() {
        this.props.authManager.authenticate({
            shouldRemember: false,
            isLoaderEnabled: true,
            username: 'foo',
            password: 'bar',
        });
    }

    render() {
        return (
            <ContentPage
                authManager={this.props.authManager}
                topDividedContent={true}
            >
                <h1>Features</h1>

                <br />
                <TextField
                    label="Username"
                    placeholder="e.g. songokuz"
                    value={this.getRouteState().foo}
                    onChange={(value) => this.setRouteState({
                        foo: value
                    })}
                />

                <br />
                <h3>Routing</h3>
                <div>
                    <Link
                        currentRouteManager={this.props.currentRouteManager}
                        url="/some-page-which-does-not-exist"
                    >
                        go to non existing page
                    </Link>
                </div>

                <br />
                <h3>Login</h3>
                <div><FunctionalLink onClick={() => this.login()}>login</FunctionalLink></div>

                <br />
                <h3>Toasts</h3>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.INFO)}>add an info toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.SUCCESS)}>add a success toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.WARNING)}>add a warning toast message</FunctionalLink></div>
                <div><FunctionalLink onClick={() => this.addToast(ToastTypes.ERROR)}>add an error toast message</FunctionalLink></div>

                <br />
                <h3>Redux</h3>
                <div><FunctionalLink onClick={() => console.log(this.props.getReduxState())}>print redux state</FunctionalLink></div>
            </ContentPage>
        );
    }
}