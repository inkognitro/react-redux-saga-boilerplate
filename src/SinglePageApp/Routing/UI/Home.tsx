import React, {Component} from 'react';
import {ContentPage} from 'SinglePageApp/Layout/UI/PageTypes/ContentPage';
import {FunctionalLink, Link} from 'Common/Layout/UI/Link/Link';
import {ToastRepositoryInterface, ToastTypes} from "Common/Toaster/Domain/ToastRepository";
import {AuthManagerInterface} from "Common/Auth/Domain/AuthManager";
import {homeRouteUrlSpecification} from "SinglePageApp/Routing/Domain/Routes";
import {RouteSpecification} from "SinglePageApp/Routing/UI/Router";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {TextField} from "Common/Layout/UI/Form/InputElements/TextField";
import {createRouteViewComponent} from "SinglePageApp/Routing/UI/RouteViewComponent";

export const routeSpecification: RouteSpecification = {
    urlSpecification: homeRouteUrlSpecification,
    renderComponent: (services) => (
        <Home
            currentRouteManager={services.currentRouteManager}
            authManager={services.authManager}
            getReduxState={() => services.store.getState()}
            toastRepository={services.toastRepository}
        />
    )
};

export type HomeProps = {
    currentRouteManager: CurrentRouteManagerInterface,
    authManager: AuthManagerInterface,
    toastRepository: ToastRepositoryInterface,
    getReduxState(): object,
};

class RepresentationalHome extends Component<HomeProps> {
    constructor(props: HomeProps) {
        super(props);
        props.currentRouteManager.setCurrentRouteState({foo: 'bar'});
    }

    addToast(type: ToastTypes) {
        this.props.toastRepository.addToastMessage({
            content: 'foo',
            type: type
        });
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
                    placeholder="e.g. songoku"
                    value={this.props.currentRouteManager.getCurrentRouteState().foo}
                    onChange={(value) => this.props.currentRouteManager.applyCurrentRouteStateChanges({
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

const Home = createRouteViewComponent<{foo: string}>(RepresentationalHome);