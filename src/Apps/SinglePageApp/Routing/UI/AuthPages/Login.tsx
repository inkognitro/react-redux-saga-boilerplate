import React from 'react';
import {ContentPage} from '../../../Layout/UI/PageTypes/ContentPage';
import {PrimaryButton} from "Common/Layout/UI/Form/Buttons/PrimaryButton";
import {TextField, TextFieldTypes} from "Common/Layout/UI/Form/InputElements/TextField";
import {Card} from "Common/Layout/UI/Card/Card";
import {Link} from "Common/Layout/UI/Link/Link";
import {createPasswordForgottenUrl, loginRouteUrlSpecification} from "../../Domain/Routes";
import {AuthManagerInterface} from "Common/Authentication/DomainOld/AuthManager";
import {CurrentRouteManagerInterface} from "Common/Routing/Domain/CurrentRouteManager";
import {RouteSpecification} from "../Router";
import {AppServices} from "../../../App";
import {RouteViewComponent} from "Common/Routing/UI/Router";

export const routeSpecification: RouteSpecification = {
    urlSpecification: loginRouteUrlSpecification,
    renderComponent: (services: AppServices) => (
        <Login
            initialRouteState={initialRouteState}
            currentRouteManager={services.currentRouteManager}
            authManager={services.authManager}
        />
    )
};

type RouteState = {
    username: string,
    password: string,
};

const initialRouteState: RouteState = {
    username: '',
    password: '',
};

export type LoginProps = {
    currentRouteManager: CurrentRouteManagerInterface,
    authManager: AuthManagerInterface
};

class Login extends RouteViewComponent<LoginProps, RouteState> {
    login() {
        this.props.authManager.authenticate({
            shouldRemember: true,
            isLoaderEnabled: true,
            username: 'foo',
            password: 'bar',
        });
    }

    render() {

        console.log('this.getRouteState()');
        console.log(this.getRouteState());

        return (
            <ContentPage
                authManager={this.props.authManager}
                topDividedContent={true}
            >
                <div className="col-sm-12 col-md-6 offset-md-3">
                    <Card title="Login">
                        <div className="card-text">
                            <TextField
                                label="Username"
                                placeholder="e.g. songoku"
                                errorMessage="wrong foo!"
                                value={this.getRouteState().username}
                                onChange={(value) => this.setRouteState({username: value})}
                            />
                            <TextField
                                label="Password"
                                type={TextFieldTypes.PASSWORD}
                                value={this.getRouteState().password}
                                onChange={(value) => this.setRouteState({password: value})}
                            />
                            <PrimaryButton onClick={() => this.login()}>Login</PrimaryButton>
                        </div>
                        <div className="card-text text-right">
                            <small className="text-muted">
                                <Link
                                    currentRouteManager={this.props.currentRouteManager}
                                    url={createPasswordForgottenUrl()}
                                >
                                    Did you forget your password?
                                </Link>
                            </small>
                        </div>
                    </Card>
                </div>
            </ContentPage>
        );
    }
}